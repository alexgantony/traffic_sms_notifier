import logging
from datetime import datetime, timezone

from sqlmodel import Session, select

from clients.traffic_client import get_travel_time
from db.engine import engine
from models.route import Route
from models.traffic import TrafficLog
from schemas.traffic import TrafficLogRead, TrafficStatus
from services.alerts.alert_service import trigger_alert
from utils.timezone import datetime_utc_to_ist

logger = logging.getLogger(__name__)


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
        checked_at=datetime_utc_to_ist(traffic_log.checked_at),
        travel_time=travel_time,
        normal_travel_time=normal_travel_time,
        delay_minutes=delay_minutes,
        traffic_status=TrafficStatus(traffic_log.traffic_status),
        distance_km=distance_km,
    )


def check_and_save_traffic(route_id: int) -> TrafficLog | None:
    with Session(engine) as session:
        statement = select(Route).where(Route.id == route_id)
        route_loaded = session.exec(statement).first()

        if route_loaded is None:
            logger.warning("Route not found: %s", route_id)
            return

        try:
            route_traffic_log = check_traffic(route_loaded)
        except Exception as e:
            logger.error("Traffic check failed for route: %s: %s", route_id, e)
            return

        session.add(route_traffic_log)
        session.commit()
        session.refresh(route_traffic_log)

        logger.info(
            "Traffic check for route: %s; Traffic status: %s",
            route_id,
            route_traffic_log.traffic_status,
        )

        res = trigger_alert(route_loaded, route_traffic_log)

        if res is not None:
            if res["success"]:
                logger.info(
                    "SMS sent for route %s, Message SID: %s",
                    route_id,
                    res["message_sid"],
                )
            else:
                logger.error(
                    "SMS not sent for route %s. Error: %s", route_id, res["error"]
                )

    return route_traffic_log
