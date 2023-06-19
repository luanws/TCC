from flask import request
from flask_restful import Resource

from src.ai.geometric_figures import GeometricFigureClassifier
from src.services.geometric_figure import get_geometric_figure_info
from src.utils.files import save_request_image


class GeometricFigureInfoResource(Resource):
    def post(self):
        image = save_request_image(request.files['image'])
        image_array = GeometricFigureClassifier.preprocess_image(image)
        geometric_figure_info = get_geometric_figure_info(image_array)
        print(geometric_figure_info)
        return geometric_figure_info
