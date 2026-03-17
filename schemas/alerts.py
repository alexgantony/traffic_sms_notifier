from datetime import datetime

from pydantic import BaseModel, ConfigDict


class AlertRead(BaseModel):
    id: int
    route_id: int
    message: str
    created_at: datetime
    is_read: bool

    model_config = ConfigDict(from_attributes=True)
