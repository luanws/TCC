import numpy as np

from src.models.geometric_figure_info import GeometricFigureInfo


def get_geometric_figure_info(image: np.ndarray, category: str) -> GeometricFigureInfo:
    image = image.squeeze()
    height = image.shape[0]
    vertical_image = np.sum(image > 0, axis=1)
    top_pixel = np.argmax(vertical_image)
    bottom_pixel = np.argmax(vertical_image[::-1])
    top_distance = top_pixel/height
    bottom_distance = bottom_pixel/height
    contains_white_pixel = bool(np.any(image > 0))
    contains_geometric_figure = contains_white_pixel
    return {
        'top_distance': top_distance,
        'bottom_distance': bottom_distance,
        'contains_geometric_figure': contains_geometric_figure,
        'category': category
    }
