from sqlalchemy import Column, Integer, String
from database import Base

class Guitarra(Base):
    __tablename__ = "guitarras"

    idGuitarra = Column(Integer, primary_key=True, index=True) 
    Marca = Column(String)
    Modelo = Column(String)
    Configuracion = Column(String)
    CantPots = Column(Integer)