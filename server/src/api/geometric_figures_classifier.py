from flask import request
from flask_restful import Resource
from src.ai.geometric_figures import GeometricFigureClassifier


class GeometricFiguresClassifierResource(Resource):
    def __init__(self) -> None:
        self.geometric_figure_classifier = GeometricFigureClassifier()

    def get(self):
        data = request.get_json()
        image_base64 = data['image']
        prediction = self.geometric_figure_classifier.predict(image_base64)
        return {
            'category': prediction
        }