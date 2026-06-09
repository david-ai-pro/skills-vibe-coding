"""
Ejemplo de test unitario para Python usando pytest.
Prueba la función que decide a qué carpeta va cada archivo según su extensión
(proyecto-modelo de organizar la carpeta Descargas — Stack 3).

Para ejecutarlo:
    pytest tests/
"""

import pytest
from organizador import categoria_para_archivo


def test_imagen_jpg():
    assert categoria_para_archivo('foto.jpg') == 'Imágenes'


def test_imagen_png_mayusculas():
    # Insensible a mayúsculas.
    assert categoria_para_archivo('LOGO.PNG') == 'Imágenes'


def test_pdf():
    assert categoria_para_archivo('factura.pdf') == 'PDFs'


def test_video_mp4():
    assert categoria_para_archivo('clip.mp4') == 'Vídeos'


def test_documento_docx():
    assert categoria_para_archivo('contrato.docx') == 'Documentos'


def test_extension_desconocida_va_a_otros():
    assert categoria_para_archivo('cosa.xyz') == 'Otros'


def test_sin_extension_va_a_otros():
    assert categoria_para_archivo('readme') == 'Otros'


def test_nombre_vacio_lanza_error():
    with pytest.raises(ValueError):
        categoria_para_archivo('')
