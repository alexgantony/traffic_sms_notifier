from datetime import datetime, timezone

from sqlmodel import Field, SQLModel


class Alert(SQLModel, table=True):
    id: int = Field(default=None, primary_key=True)
    route_id: int = Field(foreign_key="route.id")
    user_id: int = Field(foreign_key="user.id")
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    is_read: bool = False
