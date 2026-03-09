from datetime import datetime, timezone
from typing import TYPE_CHECKING

from sqlmodel import Field, Relationship, SQLModel

if TYPE_CHECKING:
    from .route import Route


class TrafficLog(SQLModel, table=True):
    id: int | None = Field(default=None, primary_key=True)
    route_id: int = Field(foreign_key="route.id")
    checked_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    duration_in_traffic: int
    normal_traffic_duration: int
    delay_seconds: int
    traffic_status: str
    distance_meters: int

    route: "Route" = Relationship(back_populates="traffic_logs")
