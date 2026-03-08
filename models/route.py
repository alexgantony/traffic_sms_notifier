from datetime import time
from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .traffic import TrafficLog
    from .user import User


class Route(SQLModel, table=True):
    name: str
    origin: str
    destination: str
    check_time: time
    id: int | None = Field(default=None, primary_key=True)

    user_id: int = Field(foreign_key="user.id")
    user: "User" = Relationship(back_populates="routes")

    traffic_logs: list["TrafficLog"] = Relationship(back_populates="route")
