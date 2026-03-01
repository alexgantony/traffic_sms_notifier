from datetime import datetime

import requests

from app.config import settings


def get_live_traffic(origin: str, destination: str, dep_datetime: datetime) -> dict:
    timestamp = int(dep_datetime.timestamp())

    url = (
        "https://maps.googleapis.com/maps/api/distancematrix/json"
        f"?origins={origin}"
        f"&destinations={destination}"
        f"&departure_time={timestamp}"
        f"&key={settings.google_backend_api_key.get_secret_value()}"
    )

    try:
        response = requests.get(url=url, timeout=5)
        response.raise_for_status()
    except requests.exceptions.RequestException as e:
        raise Exception(f"Traffic API request fail: {str(e)}")

    response_json = response.json()

    if response_json["status"] != "OK":
        raise Exception("Google returned non-OK status")

    element = response_json["rows"][0]["elements"][0]

    if element["status"] != "OK":
        raise Exception("Route element invalid")

    if "duration_in_traffic" not in element:
        raise Exception("Traffic data missing")

    distance_meters = element["distance"]["value"]
    duration_seconds = element["duration"]["value"]
    duration_in_traffic_seconds = element["duration_in_traffic"]["value"]
    delay_seconds = max(0, duration_in_traffic_seconds - duration_seconds)

    if delay_seconds <= 300:
        traffic_level = "low"
    elif delay_seconds <= 900:
        traffic_level = "medium"
    else:
        traffic_level = "high"

    traffic_dict = {
        "distance_meters": distance_meters,
        "duration_seconds": duration_seconds,
        "duration_in_traffic_seconds": duration_in_traffic_seconds,
        "delay_seconds": delay_seconds,
        "traffic_level": traffic_level,
    }

    return traffic_dict
