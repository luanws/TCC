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


def damage_image(image_array: np.ndarray) -> np.ndarray:
    image_array_preprocessed = preprocess_input(image_array)
    x = image_array_preprocessed.copy()

    for _ in range(100):
        x = preprocess.add_random_polygon(x, np.random.randint(10, 20, 2))
        x = preprocess.remove_stain(x, x.size*0.01)
        if not preprocess.is_similar(x, image_array_preprocessed):
            break

    if np.random.rand() < 0.5:
        x = preprocess.add_noise(x, 0.01, np.random.randint(2, 4))

    if preprocess.is_black_image(x) or preprocess.is_similar(x, image_array_preprocessed):
        x = image_array_preprocessed.copy()
        for i in range(100):
            noise_proportion = 0.001 * (i + 1)
            noise_group_size = np.random.randint(2, 4)
            x = preprocess.add_noise(x, noise_proportion, noise_group_size)
            x = preprocess.remove_stain(x, x.size*0.01)
            if not preprocess.is_black_image(x) and not preprocess.is_similar(x, image_array_preprocessed):
                break

    x = preprocess_input(x)
    return x


def discard_geometric_figures_with_black_image(geometric_figures: List[GeometricFigure]) -> List[GeometricFigure]:
    return [gf for gf in geometric_figures if not preprocess.is_black_image(gf['image'])]


def create_damaged_geometric_figures(geometric_figures: List[GeometricFigure]) -> List[GeometricFigure]:
    geometric_figures = deepcopy(geometric_figures)

    def damage_geometric_figure(geometric_figure: GeometricFigure) -> GeometricFigure:
        geometric_figure['image'] = damage_image(geometric_figure['image'])
        geometric_figure['is_failed'] = True
        return geometric_figure

    with ThreadPoolExecutor() as executor:
        damaged_geometric_figures = list(executor.map(damage_geometric_figure, geometric_figures))

    damaged_geometric_figures = discard_geometric_figures_with_black_image(damaged_geometric_figures)
    return damaged_geometric_figures


def add_damaged_geometric_figures(geometric_figures: List[GeometricFigure], repeat: int = 1) -> List[GeometricFigure]:
    geometric_figures = deepcopy(geometric_figures)
    for _ in range(repeat):
        damaged_geometric_figures = create_damaged_geometric_figures(geometric_figures)
        geometric_figures.extend(damaged_geometric_figures)
    return geometric_figures


def preprocess_input(image: np.ndarray) -> np.ndarray:
    x = image.copy()
    if x.shape[2] == 3:
        x = x[:, :, 1:2]
    x = preprocess.normalize(x)
    x = x**10
    x = preprocess.normalize(x)
    x = np.heaviside(x - 0.15, 1)
    x_size = x.shape[0] * x.shape[1]
    min_size_remove_stain = x_size*0.011444091796875
    x = preprocess.remove_stain(x, min_size_remove_stain)
    x = preprocess.normalize(x)
    return x


def get_train_test_validation_split(
    geometric_figures: List[GeometricFigure],
    test_ratio: float = 0.2,
    validation_ratio: float = 0.1,
    shuffle: bool = True
) -> Tuple[np.ndarray, np.ndarray, np.ndarray, np.ndarray, np.ndarray, np.ndarray]:
    shuffled_geometric_figures: List[GeometricFigure] = deepcopy(geometric_figures)
    if shuffle:
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
    y = geometric_figure_to_category_number(geometric_figure)
    x = preprocess_input(x)
    return x, y


def geometric_figure_to_category_number(geometric_figure: GeometricFigure) -> int:
    category_mapping = {
        'circle': 0,
        'square': 1,
        'triangle': 2,
        'failed-circle': 3,
        'failed-square': 4,
        'failed-triangle': 5
    }
    category = geometric_figure['category']
    is_failed = geometric_figure['is_failed']
    string_category = 'failed-' + category if is_failed else category
    return category_mapping[string_category]


def prediction_to_category(y_pred: np.ndarray) -> str:
    category_mapping = {
        0: 'circle',
        1: 'square',
        2: 'triangle',
        3: 'failed-circle',
        4: 'failed-square',
        5: 'failed-triangle'
    }
    return category_mapping[y_pred.argmax()]


def prediction_to_is_failed(y_pred: np.ndarray) -> bool:
    return prediction_to_category(y_pred).startswith('failed')


def plot_geometric_figures(geometric_figures: List[GeometricFigure], columns: int, plot_size: int = 3, *args, **kwargs):
    rows = math.ceil(len(geometric_figures)/columns)
    fig, axs = plt.subplots(rows, columns, figsize=(columns * plot_size, rows * plot_size))
    axs = axs.reshape(rows, columns)
    for i in range(rows):
        for j in range(columns):
            if i * columns + j >= len(geometric_figures):
                axs[i, j].axis('off')
                continue
            geometric_figure = geometric_figures[i * columns + j]
            image = geometric_figure['image']
            axs[i, j].imshow(image, *args, **kwargs)
            axs[i, j].set_title(geometric_figure['category'])
            axs[i, j].set_xticks([])
            axs[i, j].set_yticks([])

    fig.patch.set_facecolor('white')
    plt.tight_layout()


def plot_geometric_figures_processed(geometric_figures: List[GeometricFigure], columns: int, plot_size: int = 3, *args, **kwargs):
    geometric_figures = deepcopy(geometric_figures)
    for geometric_figure in geometric_figures:
        geometric_figure['image'] = preprocess_input(geometric_figure['image'])
    plot_geometric_figures(geometric_figures, columns, plot_size, *args, **kwargs)
