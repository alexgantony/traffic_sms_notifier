from datetime import datetime

from pydantic import BaseModel


class Checkpoint(BaseModel):
    checked_at: datetime
    delay_seconds: int
    traffic_status: str


class Analytics(BaseModel):
    avg_delay_seconds: float
    median_delay_seconds: float
    std_dev_delay_seconds: float
    max_delay_seconds: int

    light_count: int
    medium_count: int
    heavy_count: int
    light_percentage: float
    medium_percentage: float
    heavy_percentage: float

    total_checks: int
    on_time_checks: float

    recent_checks: list[Checkpoint]
