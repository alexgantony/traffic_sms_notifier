from datetime import date, datetime, time
from zoneinfo import ZoneInfo

from fastapi import APIRouter

from clients.traffic_client import get_travel_time
from services.alerts.sms_service import send_sms

test_router = APIRouter(prefix="/test", tags=["Test"])


@test_router.get("/traffic_test")
def test_traffic(origin: str, destination: str, departure_time: time):
    today = date.today()

    dep_datetime = datetime.combine(today, departure_time).replace(
        tzinfo=ZoneInfo("Asia/Kolkata")
    )

    return get_travel_time(origin, destination, dep_datetime)


@test_router.post("/twilio_sms_test")
def test_send_sms(to_phone: str):
    message = "🚦 Test message from Traffic SMS App"

    result = send_sms(to_phone, message)

    return result
