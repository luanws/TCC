import json
import os
from typing import List

from src.models.model_result import ModelResult


def create_model_results_file_if_not_exists(model_results_path: str):
    if not os.path.exists(model_results_path):
        with open(model_results_path, 'w') as f:
            f.write('{}')


def get_model_results(model_results_path: str) -> List[ModelResult]:
    try:
        with open(model_results_path, 'r') as f:
            return json.load(f)
    except FileNotFoundError:
        create_model_results_file_if_not_exists(model_results_path)
        return []


def save_model_results(name: str, accuracy: float, datetime_now: str, data_version: str, model_results_path: str):
    model_results = get_model_results(model_results_path)
    model_result: ModelResult = {
        'model_name': name,
        'accuracy': accuracy,
        'datetime': datetime_now,
        'dataset_version': data_version,
    }
    model_results.append(model_result)
    with open(model_results_path, 'w') as f:
        json.dump(model_results, f, indent=4)
