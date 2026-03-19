from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlmodel import select

from app.auth import get_current_user
from db.session import SessionDep
from models.alerts import Alert
from models.user import User
from schemas.alerts import AlertRead

alert_router = APIRouter(prefix="/alerts", tags=["Alerts"])


@alert_router.get("/", response_model=list[AlertRead])
def list_alerts(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
    user: User = Depends(get_current_user),
) -> list[Alert]:
    statement = (
        select(Alert)
        .where(Alert.user_id == user.id)
        .offset(offset)
        .limit(limit)
        .order_by(Alert.created_at.desc())  # type: ignore
    )
    alerts = list(session.exec(statement).all())
    return alerts
