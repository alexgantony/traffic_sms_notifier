from datetime import datetime, timezone

from clients.traffic_client import get_travel_time
from models.route import Route
from models.traffic import TrafficLog
from schemas.traffic import TrafficLogRead, TrafficStatus


def check_traffic(route: Route) -> TrafficLog:
    assert route.id is not None
    datetime_now = datetime.now(timezone.utc)
    travel_time_dict = get_travel_time(route.origin, route.destination, datetime_now)

    distance_meters = travel_time_dict["distance_meters"]
    duration_seconds = travel_time_dict["duration_seconds"]
    duration_in_traffic_seconds = travel_time_dict["duration_in_traffic_seconds"]

    delay_seconds = max(0, duration_in_traffic_seconds - duration_seconds)

    if delay_seconds <= 300:
        traffic_level = TrafficStatus.LIGHT
    elif delay_seconds <= 900:
        traffic_level = TrafficStatus.MEDIUM
    else:
        traffic_level = TrafficStatus.HEAVY

    traffic_log = TrafficLog(
        route_id=route.id,
        checked_at=datetime_now,
        duration_in_traffic=duration_in_traffic_seconds,
        normal_traffic_duration=duration_seconds,
        delay_seconds=delay_seconds,
        traffic_status=traffic_level.value,
        distance_meters=distance_meters,
    )

    return traffic_log


def format_traffic_log(traffic_log: TrafficLog) -> TrafficLogRead:
    travel_time = int(traffic_log.duration_in_traffic / 60)
    normal_travel_time = int(traffic_log.normal_traffic_duration / 60)
    delay_minutes = int(traffic_log.delay_seconds / 60)
    distance_km = round(traffic_log.distance_meters / 1000, 2)

    assert traffic_log.id is not None

    return TrafficLogRead(
        id=traffic_log.id,
        checked_at=traffic_log.checked_at,
        travel_time=travel_time,
        normal_travel_time=normal_travel_time,
        delay_minutes=delay_minutes,
        traffic_status=TrafficStatus(traffic_log.traffic_status),
        distance_km=distance_km,
    )
