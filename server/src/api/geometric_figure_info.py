from flask import request
from flask_restful import Resource

from src.ai.geometric_figures import GeometricFigureClassifier
from src.services.geometric_figure import get_geometric_figure_info
from src.utils.files import save_request_image


class GeometricFigureInfoResource(Resource):
    def __init__(self):
        self.geometric_figure_classifier = GeometricFigureClassifier()

    def post(self):
        image = save_request_image(request.files['image'])
        image_array = self.geometric_figure_classifier.preprocess_image(image)
        prediction = self.geometric_figure_classifier.predict(image)
        geometric_figure_info = get_geometric_figure_info(image_array, prediction)
        print(geometric_figure_info)
        return geometric_figure_info
