import os

from flask import Flask

from src.ai import geometric_figures as geometric_figures_ai
from src.api import api_routes_blueprint

app = Flask(__name__)
app.register_blueprint(api_routes_blueprint, url_prefix='/api')
geometric_figures_ai.download_model()

if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
