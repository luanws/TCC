from typing import Tuple

import cv2
import numpy as np


def add_noise(image_array: np.ndarray, proportion: float, group_size: int) -> np.ndarray:
    """Adiciona ruído preto aleatório em grupos de pixels em uma imagem numpy.

    Args:
        image_array (np.ndarray): Array numpy da imagem.
        proportion (float): A proporção de grupos de pixels pretos a serem adicionados, deve estar entre 0 e 1.
        group_size (int): O tamanho dos grupos de pixels de ruído.

    Returns:
        np.ndarray: A imagem com grupos de pixels de ruído preto adicionados.
    """
    assert 0 <= proportion <= 1, "A proporção deve estar entre 0 e 1."
    assert group_size > 0, "O tamanho do grupo deve ser positivo."

    # Calcula o número de grupos de pixels pretos a serem adicionados.
    num_groups = int(proportion * image_array.size / group_size)

    # Cria um array de índices aleatórios para os grupos.
    indices = np.random.choice(image_array.size // group_size, size=num_groups, replace=False)

    # Converte os índices em coordenadas (linha, coluna) do canto superior esquerdo do grupo.
    coords = np.unravel_index(indices * group_size, shape=image_array.shape)

    # Define os valores dos pixels nos grupos selecionados para preto.
    for i in range(num_groups):
        image_array[coords[0][i]:coords[0][i]+group_size, coords[1][i]:coords[1][i]+group_size] = 0

    return image_array


def add_random_polygon(image_array: np.ndarray, polygon_shape: Tuple[int, int]) -> np.ndarray:
    # cria uma cópia da imagem para modificar
    polygon_image = np.zeros(polygon_shape, dtype=float)

    # gera um número aleatório entre 3 e 10 para o número de vértices
    num_vertices = np.random.randint(3, 10)

    # gera um conjunto aleatório de coordenadas para os vértices
    vertices = np.random.randint(0, polygon_image.shape[0], size=(num_vertices, 2))

    # desenha o polígono na imagem
    cv2.fillPoly(polygon_image, [vertices], 1)

    # adicionar o polígono à imagem original em uma posição aleatória
    image_array_copy = image_array.copy()
    left = np.random.randint(0, image_array.shape[1] - polygon_shape[1])
    top = np.random.randint(0, image_array.shape[0] - polygon_shape[0])
    image_array_copy[top:top+polygon_shape[0], left:left+polygon_shape[1]][polygon_image == 1] = 0
    return image_array_copy
