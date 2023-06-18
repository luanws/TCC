from flask import request
from flask_restful import Resource

from src.ai.geometric_figures import GeometricFigureClassifier
from src.utils.files import save_request_image


class GeometricFiguresClassifierResource(Resource):
    def __init__(self) -> None:
        self.geometric_figure_classifier = GeometricFigureClassifier()

    def post(self):
        image = save_request_image(request.files['image'])
        prediction = self.geometric_figure_classifier.predict(image)
        return {
            'category': prediction
        }
