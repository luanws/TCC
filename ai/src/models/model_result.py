from typing_extensions import TypedDict


class ModelResult(TypedDict):
    model_name: str
    accuracy: float
    datetime: str
    dataset_version: str
