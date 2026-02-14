from datetime import time

from sqlmodel import Field, SQLModel


class Route(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    name: str = Field(index=True)
    origin: str
    destination: str
    check_time: time
