import numpy as np
from typing_extensions import TypedDict


class GeometricFigureFromJSON(TypedDict):
    id: int
    type: str
    isFailed: bool
    filename: str
