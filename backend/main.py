"""
Compatibility entrypoint for Render.

Both of the following commands now start the same English API:
  uvicorn main:app
  uvicorn main_en:app

The canonical implementation is main_en.py.
"""
from main_en import app

__all__ = ["app"]
