import numpy as np
from scipy.ndimage import label


def normalize(image: np.ndarray) -> np.ndarray:
    image = image - np.min(image)
    max_value = np.max(image)
    if max_value != 0:
        image = image / max_value
    return image


def remove_stain(image: np.ndarray, min_size: int) -> np.ndarray:
    # Rotula as regiões conectadas de pixels brancos
    labels, number_of_labels = label(image)
    # Conta o número de pixels brancos em cada região
    count = np.bincount(labels.flatten())[1:]
    # Elimina as regiões com poucos pixels brancos
    mask = np.zeros_like(labels, dtype=bool)
    for i in range(1, number_of_labels+1):
        if count[i-1] >= min_size:
            mask |= labels == i
    # Aplica a máscara para remover as manchas
    image_without_stain = np.zeros_like(image)
    image_without_stain[mask] = image[mask]
    return image_without_stain
