from typing import Annotated, Sequence

from fastapi import APIRouter, Query
from sqlmodel import select

from db.session import SessionDep
from models.route import Route, RouteCreate

routes_router = APIRouter(prefix="/routes", tags=["Routes"])


# create new route
@routes_router.post("/", response_model=Route)
def create_route(route: RouteCreate, session: SessionDep):
    route_data = route.model_dump()
    db_route = Route(**route_data)
    session.add(db_route)
    session.commit()
    session.refresh(db_route)
    return db_route


# list all route
@routes_router.get("/", response_model=list[Route])
def list_routes(
    session: SessionDep, offset: int = 0, limit: Annotated[int, Query(le=100)] = 100
) -> Sequence[Route]:
    routes = session.exec(
        select(Route).offset(offset).limit(limit).order_by(Route.id)  # type: ignore
    ).all()
    return routes
