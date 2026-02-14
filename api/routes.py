from fastapi import APIRouter

from db.session import SessionDep
from models.route import Route, RouteCreate

routes_router = APIRouter()


@routes_router.post("/routes/")
def create_route(route: RouteCreate, session: SessionDep):
    route_data = route.model_dump()
    db_route = Route(**route_data)
    session.add(db_route)
    session.commit()
    session.refresh(db_route)
    return db_route
