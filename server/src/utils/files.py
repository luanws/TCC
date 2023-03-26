import os
import urllib.request


def download_file(url: str, filename: str):
    urllib.request.urlretrieve(url, filename)

def create_directory_if_not_exists(directory: str):
    if not os.path.exists(directory):
        os.makedirs(directory)
