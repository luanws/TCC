import os
import urllib.request

from PIL import Image


def download_file(url: str, filename: str):
    urllib.request.urlretrieve(url, filename)


def create_directory_if_not_exists(directory: str):
    directory = os.path.dirname(directory)
    if not os.path.exists(directory):
        os.makedirs(directory)


def save_request_image(image_file_storage) -> Image:
    path = os.path.join(os.getcwd(), 'data', 'upload', image_file_storage.filename)
    create_directory_if_not_exists(path)
    with open(path, 'wb') as f:
        f.write(image_file_storage.read())
    image = Image.open(path)
    return image
