from flask import Blueprint
from flask_restful import Api

api_routes_blueprint = Blueprint('api_routes', __name__)
api = Api(api_routes_blueprint)

@api_routes_blueprint.route('/')
def index():
    return 'TCC API'