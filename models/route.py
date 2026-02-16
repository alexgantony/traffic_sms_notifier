from datetime import time
from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .user import User


class RouteBase(SQLModel):
    name: str
    origin: str
    destination: str
    check_time: time


class Route(RouteBase, table=True):
    id: int | None = Field(default=None, primary_key=True)

    user_id: int = Field(foreign_key="user.id")
    user: "User" = Relationship(back_populates="routes")


class RouteCreate(RouteBase):
    pass


class RouteUpdate(SQLModel):
    name: str | None = None
    origin: str | None = None
    destination: str | None = None
    check_time: time | None = None
