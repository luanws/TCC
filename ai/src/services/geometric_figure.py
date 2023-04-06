import json
import math
import os
from concurrent.futures import ThreadPoolExecutor
from typing import List, Optional, Tuple

import numpy as np
from matplotlib import pyplot as plt
from PIL import Image

from src.models.geometric_figure import GeometricFigure
from src.models.geometric_figure_from_json import GeometricFigureFromJSON

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


def preprocess_input(x: np.ndarray) -> np.ndarray:
    return x[:, :, 1:2]


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
