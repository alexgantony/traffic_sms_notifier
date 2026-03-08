from datetime import time

from pydantic import BaseModel, ConfigDict


class RouteBase(BaseModel):
    name: str
    origin: str
    destination: str
    check_time: time


class RouteRead(RouteBase):
    id: int

    model_config = ConfigDict(from_attributes=True)


class RouteCreate(RouteBase):
    pass


class RouteUpdate(BaseModel):
    name: str | None = None
    origin: str | None = None
    destination: str | None = None
    check_time: time | None = None
