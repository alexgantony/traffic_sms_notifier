from datetime import datetime, timezone

from clients.traffic_client import get_travel_time
from models.route import Route
from models.traffic import TrafficLog


def check_traffic(route: Route) -> TrafficLog:
    assert route.id is not None
    datetime_now = datetime.now(timezone.utc)
    travel_time_dict = get_travel_time(route.origin, route.destination, datetime_now)

    distance_meters = travel_time_dict["distance_meters"]
    duration_seconds = travel_time_dict["duration_seconds"]
    duration_in_traffic_seconds = travel_time_dict["duration_in_traffic_seconds"]

    delay_seconds = max(0, duration_in_traffic_seconds - duration_seconds)

    if delay_seconds <= 300:
        traffic_level = "low"
    elif delay_seconds <= 900:
        traffic_level = "medium"
    else:
        traffic_level = "high"

    traffic_log = TrafficLog(
        route_id=route.id,
        checked_at=datetime_now,
        duration_in_traffic=duration_in_traffic_seconds,
        normal_traffic_duration=duration_seconds,
        delay_seconds=delay_seconds,
        traffic_status=traffic_level,
        distance_meters=distance_meters,
    )

    return traffic_log
