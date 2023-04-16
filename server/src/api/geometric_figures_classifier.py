import os

from flask import request
from flask_restful import Resource
from PIL import Image

from src.ai.geometric_figures import GeometricFigureClassifier
from src.utils.files import create_directory_if_not_exists


class GeometricFiguresClassifierResource(Resource):
    def __init__(self) -> None:
        self.geometric_figure_classifier = GeometricFigureClassifier()

    def post(self):
        image = request.files['image']
        path = os.path.join(os.getcwd(), 'data', 'upload', image.filename)
        create_directory_if_not_exists(path)
        with open(path, 'wb') as f:
            f.write(image.read())
        image = Image.open(path)
        prediction = self.geometric_figure_classifier.predict(image)
        return {
            'category': prediction
        }