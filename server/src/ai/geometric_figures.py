import keras
import numpy as np
from PIL import Image

from src.utils import files


class GeometricFigureClassifier:
    model: keras.models.Model
    h5_file_url: str = 'https://download847.mediafire.com/9dsd959zgvsgBdchwIixXUWh8dRl6vaTEPKa0Ru-V8L6bGYwSoc3OrMe68GGLQE0UPJHpwv1_UmGnwItot_hud8FLfk/y9wi7sq5cgzyycl/geometric_figure_classifier.h5'
    filename: str = 'data/geometric_figure_classifier.h5'
    categories: list[str] = ['circle', 'square', 'triangle']
    image_size: int = 512

    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(GeometricFigureClassifier, cls).__new__(cls)
        return cls.instance

    def __init__(self):
        self.model = self.load_model()

    def download_model(self):
        print('Downloading model...')
        files.create_directory_if_not_exists('data')
        files.download_file(self.h5_file_url, self.filename)
        print('Model downloaded!')

    def load_model(self) -> keras.models.Model:
        print('Loading model...')
        try:
            model = keras.models.load_model(self.filename)
        except IOError:
            self.download_model()
            return self.load_model()
        print('Model loaded!')
        return model

    def __decode_prediction(self, prediction: np.ndarray) -> str:
        return self.categories[np.argmax(prediction)]
    
    def __preprocess_image(self, image: Image) -> np.ndarray:
        image = image.resize((self.image_size, self.image_size))
        image_array = np.array(image, dtype=np.float32) / 255
        image_array = image_array[:, :, 1]
        image_array = np.expand_dims(image_array, axis=0)
        return image_array

    def predict(self, image: Image) -> str: 
        image = self.__preprocess_image(image)
        prediction = self.model.predict(image)
        return self.__decode_prediction(prediction)
        