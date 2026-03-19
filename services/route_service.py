from models.route import Route
from schemas.route import RouteRead
from utils.timezone import utc_to_ist


def format_route(route: Route) -> RouteRead:
    assert route.id is not None
    return RouteRead(
        id=route.id,
        name=route.name,
        origin=route.origin,
        destination=route.destination,
        check_time=utc_to_ist(route.check_time),
    )
