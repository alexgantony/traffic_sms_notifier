from typing import Annotated

from fastapi import APIRouter, Depends, Query
from sqlmodel import select

from app.auth import get_owned_route
from db.session import SessionDep
from models.route import Route
from models.traffic import TrafficLog
from schemas.traffic import TrafficLogRead
from services.traffic_service import check_traffic, format_traffic_log

traffic_router = APIRouter(prefix="/routes", tags=["Traffic"])


@traffic_router.post("/{route_id}/check-traffic", response_model=TrafficLogRead)
def check_route_traffic(session: SessionDep, route: Route = Depends(get_owned_route)):
    traffic_log = check_traffic(route)

    session.add(traffic_log)
    session.commit()
    session.refresh(traffic_log)

    return format_traffic_log(traffic_log)


@traffic_router.get("/{route_id}/traffic-logs", response_model=list[TrafficLogRead])
def list_traffic_log(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
    route: Route = Depends(get_owned_route),
) -> list[TrafficLogRead]:
    logs = session.exec(
        select(TrafficLog)
        .where(TrafficLog.route_id == route.id)
        .offset(offset)
        .limit(limit)
    ).all()

    return [format_traffic_log(log) for log in logs]
