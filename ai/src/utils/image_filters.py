import numpy as np


def add_noise(image_array: np.ndarray, proportion: float) -> np.ndarray:
    """Adiciona ruído preto aleatório em uma imagem numpy.

    Args:
        image_array (np.ndarray): Array numpy da imagem.
        proportion (float): A proporção de pixels pretos a serem adicionados, deve estar entre 0 e 1.

    Returns:
        np.ndarray: A imagem com ruído preto adicionado.
    """
    assert 0 <= proportion <= 1, "A proporção deve estar entre 0 e 1."

    # Calcula o número de pixels pretos a serem adicionados.
    num_pixels = int(proportion * image_array.size)

    # Cria um array de índices aleatórios.
    indices = np.random.choice(image_array.size, size=num_pixels, replace=False)

    # Converte os índices em coordenadas (linha, coluna).
    coords = np.unravel_index(indices, shape=image_array.shape)

    # Define os valores dos pixels selecionados para preto.
    image_array[coords] = 0

    return image_array
