from datetime import time

from sqlmodel import Field, SQLModel


class RouteBase(SQLModel):
    name: str
    origin: str
    destination: str
    check_time: time


class Route(RouteBase, table=True):
    id: int | None = Field(default=None, primary_key=True)


class RouteCreate(RouteBase):
    pass


class RouteUpdate(SQLModel):
    name: str | None = None
    origin: str | None = None
    destination: str | None = None
    check_time: time | None = None
