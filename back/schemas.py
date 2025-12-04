# schemas.py
from pydantic import BaseModel
from typing import Optional

class GuitarraBase(BaseModel):
    Marca: Optional[str] = None
    Modelo: Optional[str] = None
    Configuracion: Optional[str] = None
    CantPots: Optional[int] = None

class GuitarraCreate(GuitarraBase):
    idGuitarra: int

class Guitarra(GuitarraBase):
    idGuitarra: int

    class Config:
        from_attributes = True

class GuitarraDelete(BaseModel):
    idGuitarra: int