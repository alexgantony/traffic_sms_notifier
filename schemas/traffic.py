from datetime import datetime
from enum import Enum

from pydantic import BaseModel, ConfigDict


class TrafficStatus(str, Enum):
    LIGHT = "Light"
    MEDIUM = "Medium"
    HEAVY = "Heavy"


class TrafficLogRead(BaseModel):
    id: int
    checked_at: datetime
    travel_time: int
    normal_travel_time: int
    delay_minutes: int
    traffic_status: TrafficStatus
    distance_km: float

    model_config = ConfigDict(from_attributes=True)
