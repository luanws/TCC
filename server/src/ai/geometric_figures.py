import os

import keras
import numpy as np
from PIL import Image

from src.utils import preprocess


class GeometricFigureClassifier:
    model: keras.models.Model
    filename: str = os.path.join(os.getcwd(), 'data', 'geometric_figure_classifier.h5')
    categories: list[str] = ['circle', 'square', 'triangle', 'failed-circle', 'failed-square', 'failed-triangle']
    image_size: int = 128

    def __init__(self):
        if not hasattr(self, 'model'):
            GeometricFigureClassifier.model = self.load_model()

    def load_model(self) -> keras.models.Model:
        print('Loading model...')
        model = keras.models.load_model(self.filename)
        print('Model loaded!')
        return model

    def __decode_prediction(self, prediction: np.ndarray) -> str:
        return self.categories[np.argmax(prediction)]
    
    def preprocess_input(self, x: np.ndarray) -> np.ndarray:
        x = x.copy()
        x = x[:, :, 1:2]
        x = preprocess.normalize(x)
        x = x**10
        x = preprocess.normalize(x)
        x = np.heaviside(x - 0.15, 1)
        x_size = x.shape[0] * x.shape[1]
        min_size_remove_stain = int(3000*(x_size)/(512**2))
        x = preprocess.remove_stain(x, min_size_remove_stain)
        x = preprocess.normalize(x)
        return x

    def __preprocess_image(self, image: Image) -> np.ndarray:
        image = image.resize((self.image_size, self.image_size))
        image_array = np.array(image, dtype=np.float32) / 255
        image_array = self.preprocess_input(image_array)
        image_array = np.expand_dims(image_array, axis=0)
        return image_array

    def predict(self, image: Image) -> str: 
        image = self.__preprocess_image(image)
        prediction = self.model.predict([image])
        return self.__decode_prediction(prediction)
        