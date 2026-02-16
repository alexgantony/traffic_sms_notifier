from typing import Annotated, Sequence

from fastapi import APIRouter, HTTPException, Query
from sqlmodel import select

from db.session import SessionDep
from models.route import Route, RouteCreate, RouteUpdate

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


# read route by id
@routes_router.get("/{route_id}", response_model=Route)
def read_route(route_id: int, session: SessionDep) -> Route:
    route = session.get(Route, route_id)
    if not route:
        raise HTTPException(status_code=404, detail=f"Route ID: {route_id} not found")
    return route


# delete route
@routes_router.delete("/{route_id}", status_code=204)
def delete_route(route_id: int, session: SessionDep):
    route = session.get(Route, route_id)
    if not route:
        raise HTTPException(status_code=404, detail=f"Route ID: {route_id} not found")
    session.delete(route)
    session.commit()


# update route
@routes_router.patch("/{route_id}", response_model=Route)
def update_route(
    route_id: int, route_update: RouteUpdate, session: SessionDep
) -> Route:
    route = session.get(Route, route_id)
    if not route:
        raise HTTPException(status_code=404, detail=f"Route ID: {route_id} not found")
    update_data = route_update.model_dump(exclude_unset=True)
    for k, v in update_data.items():
        setattr(route, k, v)

    session.commit()
    session.refresh(route)
    return route
