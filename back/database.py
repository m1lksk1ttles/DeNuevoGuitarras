import os
from dotenv import load_dotenv
from sqlalchemy import create_engine

load_dotenv()

# OJO AQUÍ:
# Si tu código dice: os.getenv("DATABASE_URL", "sqlite:///./test.db")
# Significa que si falla la variable, usa SQLite.

SQLALCHEMY_DATABASE_URL = os.getenv("DATABASE_URL")

# Parche de seguridad para que no falle si la URL viene sin el driver
if SQLALCHEMY_DATABASE_URL and SQLALCHEMY_DATABASE_URL.startswith("mysql://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace("mysql://", "mysql+pymysql://", 1)

# Si por alguna razón la URL es None (Render no la lee), lanzamos error para darnos cuenta
if not SQLALCHEMY_DATABASE_URL:
    print("CRITICAL ERROR: No se encontró DATABASE_URL")
    # Esto forzará el error en logs en lugar de usar SQLite silenciosamente

engine = create_engine(SQLALCHEMY_DATABASE_URL, pool_pre_ping=True)
# ... resto del código ...