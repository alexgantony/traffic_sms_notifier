from app.auth import get_owned_route
from db.session import SessionDep
from fastapi import APIRouter, Depends, HTTPException
from models.route import Route
from models.traffic import TrafficLog
from schemas.analytics import Analytics
from services.analytics_service import calculate_route_analytics
from sqlmodel import select

analytics_router = APIRouter(prefix="/analytics", tags=["Analytics"])


@analytics_router.get("/traffic/{route_id}", response_model=Analytics)
def get_traffic_analytics(
    route_id: int, session: SessionDep, route: Route = Depends(get_owned_route)
) -> Analytics:
    logs = session.exec(select(TrafficLog).where(TrafficLog.route_id == route.id)).all()

    if not logs:
        raise HTTPException(
            status_code=404, detail="No traffic logs found for this route"
        )

    return calculate_route_analytics(logs)
