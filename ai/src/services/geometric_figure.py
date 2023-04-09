import json
import math
import os
from concurrent.futures import ThreadPoolExecutor
from copy import deepcopy
from typing import List, Optional, Tuple

import numpy as np
from matplotlib import pyplot as plt
from PIL import Image

from src.models.geometric_figure import GeometricFigure
from src.models.geometric_figure_from_json import GeometricFigureFromJSON
from src.utils import preprocess

memorized_geometric_figures: Optional[List[GeometricFigure]] = None


def load_image(path: str, image_size: Tuple[int, int]) -> np.ndarray:
    img = Image.open(path)
    img = img.resize(image_size)
    img = np.array(img, dtype=float)/255
    return img


def get_geometric_figures(path: str, image_size: Tuple[int, int], memorize: bool = False) -> List[GeometricFigure]:
    data_path = os.path.join(path, 'data.json')
    images_path = os.path.join(path, 'Geometric Figures')
    global memorized_geometric_figures
    if memorized_geometric_figures is not None and memorize:
        return memorized_geometric_figures
    with open(data_path, 'r') as f:
        content = f.read()
    data: List[GeometricFigureFromJSON] = json.loads(content)

    def process_geometric_figure(geometric_figure: dict) -> GeometricFigure:
        return {
            'id': geometric_figure['id'],
            'category': geometric_figure['type'],
            'is_failed': geometric_figure['isFailed'],
            'filename': geometric_figure['filename'],
            'image': load_image(os.path.join(images_path, geometric_figure['filename']), image_size)
        }

    with ThreadPoolExecutor() as executor:
        geometric_figures = list(executor.map(process_geometric_figure, data))

    if memorize:
        memorized_geometric_figures = geometric_figures
    return geometric_figures


def preprocess_input(image: np.ndarray) -> np.ndarray:
    x = image.copy()
    x = x[:, :, 1:2]
    x = preprocess.normalize(x)
    x = x**10
    x = preprocess.normalize(x)
    x = np.heaviside(x - 0.15, 1)
    x_size = x.shape[0] * x.shape[1]
    min_size_remove_stain = 3000*(x_size)/(512**2)
    x = preprocess.remove_stain(x, min_size_remove_stain)
    x = preprocess.normalize(x)
    return x


def get_train_test_validation_split(
    geometric_figures: List[GeometricFigure],
    test_ratio: float = 0.2,
    validation_ratio: float = 0.1
) -> Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
    shuffled_geometric_figures: List[GeometricFigure] = deepcopy(geometric_figures)
    np.random.shuffle(shuffled_geometric_figures)

    x, y = zip(*[get_input_and_output(gf) for gf in shuffled_geometric_figures])
    x = np.array(x)
    y = np.array(y)

    test_size = int(len(x) * test_ratio)
    validation_size = int(len(x) * validation_ratio)

    x_train, x_test = x[:-test_size], x[-test_size:]
    y_train, y_test = y[:-test_size], y[-test_size:]

    x_train, x_validation = x_train[:-validation_size], x_train[-validation_size:]
    y_train, y_validation = y_train[:-validation_size], y_train[-validation_size:]

    return x_train, y_train, x_test, y_test, x_validation, y_validation


def get_input_and_output(geometric_figure: GeometricFigure) -> Tuple[np.ndarray, np.ndarray]:
    x = geometric_figure['image']
    y = {
        'circle': 0,
        'square': 1,
        'triangle': 2,
    }[geometric_figure['category']]
    x = preprocess_input(x)
    return x, y


def prediction_to_category(y_pred: np.ndarray) -> str:
    category_mapping = {
        0: 'circle',
        1: 'square',
        2: 'triangle',
    }
    return category_mapping[y_pred.argmax()]


def plot_geometric_figures(geometric_figures: List[GeometricFigure], columns: int, plot_size: int = 3):
    rows = math.ceil(len(geometric_figures)/columns)
    fig, axs = plt.subplots(rows, columns, figsize=(columns * plot_size, rows * plot_size))
    axs = axs.reshape(rows, columns)
    for i in range(rows):
        for j in range(columns):
            if i * columns + j >= len(geometric_figures):
                axs[i, j].axis('off')
                continue
            geometric_figure = geometric_figures[i * columns + j]
            axs[i, j].imshow(geometric_figure['image'])
            axs[i, j].set_title(geometric_figure['category'])
            axs[i, j].set_xticks([])
            axs[i, j].set_yticks([])

    fig.patch.set_facecolor('white')
    plt.tight_layout()
