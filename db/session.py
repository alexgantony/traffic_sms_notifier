from sqlmodel import Session, SQLModel

from db.engine import engine
from models import route


def create_db_and_tables():
    SQLModel.metadata.create_all(engine)


def get_session():
    with Session(engine) as session:
        yield session
