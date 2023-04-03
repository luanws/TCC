import numpy as np
from typing_extensions import TypedDict


class GeometricFigure(TypedDict):
    id: int
    category: str
    is_failed: bool
    filename: str
    image: np.ndarray
