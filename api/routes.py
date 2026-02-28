from typing import Annotated, Sequence

from fastapi import APIRouter, Depends, Query
from sqlmodel import select

from app.auth import get_current_user, get_owned_route
from db.session import SessionDep
from models.route import Route, RouteCreate, RouteUpdate
from models.user import User

routes_router = APIRouter(prefix="/routes", tags=["Routes"])


# create new route
@routes_router.post("/", response_model=Route)
def create_route(
    route: RouteCreate, session: SessionDep, user: User = Depends(get_current_user)
):
    route_data = route.model_dump()
    db_route = Route(**route_data)
    assert user.id is not None
    db_route.user_id = user.id
    session.add(db_route)
    session.commit()
    session.refresh(db_route)
    return db_route


# list all route
@routes_router.get("/", response_model=list[Route])
def list_routes(
    session: SessionDep,
    offset: int = 0,
    limit: Annotated[int, Query(le=100)] = 100,
    user: User = Depends(get_current_user),
) -> Sequence[Route]:
    routes = session.exec(
        select(Route)
        .where(Route.user_id == user.id)
        .offset(offset)
        .limit(limit)
        .order_by(Route.id)  # type: ignore
    ).all()
    return routes


# read route by id
@routes_router.get("/{route_id}", response_model=Route)
def read_route(route: Route = Depends(get_owned_route)) -> Route:
    return route


# delete route
@routes_router.delete("/{route_id}", status_code=204)
def delete_route(session: SessionDep, route: Route = Depends(get_owned_route)):
    session.delete(route)
    session.commit()


# update route
@routes_router.patch("/{route_id}", response_model=Route)
def update_route(
    route_update: RouteUpdate,
    session: SessionDep,
    route: Route = Depends(get_owned_route),
) -> Route:
    update_data = route_update.model_dump(exclude_unset=True)
    for k, v in update_data.items():
        setattr(route, k, v)

    session.commit()
    session.refresh(route)
    return route
