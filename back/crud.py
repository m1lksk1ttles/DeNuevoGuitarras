from sqlalchemy.orm import Session
from models import Guitarra
from schemas import GuitarraCreate, GuitarraDelete

def obtener_guitarras(db: Session):
    return db.query(Guitarra).all()

def crear_guitarra(db: Session, guitarra: GuitarraCreate):
    nueva_guitarra = Guitarra(
        idGuitarra=guitarra.idGuitarra,
        Marca=guitarra.Marca,
        Modelo=guitarra.Modelo,
        Configuracion=guitarra.Configuracion,
        CantPots=guitarra.CantPots
    )
    db.add(nueva_guitarra)
    db.commit()
    db.refresh(nueva_guitarra)
    return nueva_guitarra

def eliminar_guitarra(db: Session, id_guitarra: int):
    guitarra = db.query(Guitarra).filter(Guitarra.idGuitarra == id_guitarra).first()
    if guitarra:
        db.delete(guitarra)
        db.commit()
        return True
    return False

def actualizar_guitarra(db: Session, guitarra: GuitarraCreate):
    guitarra_existente = db.query(Guitarra).filter(Guitarra.idGuitarra == guitarra.idGuitarra).first()
    
    if guitarra_existente:
        if guitarra.Marca is not None:
            guitarra_existente.Marca = guitarra.Marca
        if guitarra.Modelo is not None:
            guitarra_existente.Modelo = guitarra.Modelo
        if guitarra.Configuracion is not None:
            guitarra_existente.Configuracion = guitarra.Configuracion
        if guitarra.CantPots is not None:
            guitarra_existente.CantPots = guitarra.CantPots
            
        db.commit()
        db.refresh(guitarra_existente)
        return guitarra_existente
    return None