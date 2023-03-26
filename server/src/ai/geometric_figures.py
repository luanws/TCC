import keras
import numpy as np
from PIL import Image

from src.utils import files

h5_file_url = 'https://firebasestorage.googleapis.com/v0/b/tcc-electrical-engineering.appspot.com/o/models%2Fgeometric_figure_classifier.h5?alt=media&token=e9c99f46-9260-4793-b37a-30b2ac78f66b'
filename = 'data/geometric_figure_classifier.h5'
categories = ['circle', 'square', 'triangle']

def download_model():
    print('Downloading model...')
    files.create_directory_if_not_exists('data')
    files.download_file(h5_file_url, filename)
    print('Model downloaded!')

class GeometricFigureClassifier:
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(GeometricFigureClassifier, cls).__new__(cls)
        return cls.instance

    def __init__(self):
        self.model = None
        self.load_model()

    def load_model(self):
        print('Loading model...')
        self.model = keras.models.load_model(filename)
        print('Model loaded!')
    
    def __decode_prediction(self, prediction: np.ndarray) -> str:
        return categories[np.argmax(prediction)]
    
    def __preprocess_image(self, image: Image) -> np.ndarray:
        image = image.resize((150, 150))
        image = np.array(image)
        image = image / 255
        image = np.expand_dims(image, axis=0)
        return image
    
    def __base64_to_image(self, image_base64: str) -> Image:
        image_base64 = image_base64.split(',')[1]
        image = Image.open(files.base64_to_bytes(image_base64))
        return image

    def predict(self, image_base64: str) -> str:
        image = self.__base64_to_image(image_base64)
        image = self.__preprocess_image(image)
        prediction = self.model.predict(image)
        return self.__decode_prediction(prediction)
        