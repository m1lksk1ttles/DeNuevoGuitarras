from sqlalchemy import Column, Integer, String
from database import Base

class Guitarra(Base):
    __tablename__ = "guitarras"

    idGuitarra = Column(Integer, primary_key=True, index=True) 
    Marca = Column(String(40))
    Modelo = Column(String(40))
    Configuracion = Column(String(40))
    CantPots = Column(Integer(40))