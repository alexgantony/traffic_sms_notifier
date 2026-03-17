import logging

from sqlmodel import Session

from app.config import settings
from db.engine import engine
from models.alerts import Alert
from services.alerts.sms_service import send_sms

logger = logging.getLogger(__name__)


def build_traffic_message(route, traffic_data):
    route_name = route.name
    origin = route.origin
    destination = route.destination

    delay = int(traffic_data.delay_seconds / 60)
    traffic_status = traffic_data.traffic_status

    message = (
        "Traffic Alert\n\n"
        f"{route_name}\n"
        f"{origin} → {destination}\n\n"
        f"Delay: {delay} min\n"
        f"Status: {traffic_status}"
    )

    return message


def send_traffic_alert(route, traffic_data):
    phone_number = route.user.phone_number
    message = build_traffic_message(route, traffic_data)

    with Session(engine) as session:
        alert = Alert(route_id=route.id, user_id=route.user.id, message=message)

        session.add(alert)
        try:
            session.commit()
            session.refresh(alert)
            logger.info("Alert created for route %s (id=%s)", route.id, alert.id)
        except Exception as e:
            logger.error("Failed to create alert for route %s: %s", route.id, e)
            session.rollback()

    if settings.sms_enabled:
        return send_sms(phone_number, message)
    else:
        return {
            "success": False,
            "message_sid": None,
            "error": "SMS disabled",
        }


def trigger_alert(route, traffic_data):
    if traffic_data.traffic_status in ["Medium", "Heavy"]:
        return send_traffic_alert(route, traffic_data)
    else:
        return None
