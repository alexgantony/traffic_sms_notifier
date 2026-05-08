import statistics

from schemas.analytics import Analytics


def calculate_route_analytics(logs):
    delay = [log.delay_seconds for log in logs]
    total_checks = len(logs)

    avg_delay_seconds = statistics.mean(delay)
    median_delay_seconds = statistics.median(delay)
    std_dev_delay_seconds = statistics.stdev(delay) if len(delay) > 1 else 0.0
    max_delay_seconds = max(delay)

    light_count = sum(1 for log in logs if log.traffic_status.lower() == "light")
    medium_count = sum(1 for log in logs if log.traffic_status.lower() == "medium")
    heavy_count = sum(1 for log in logs if log.traffic_status.lower() == "heavy")

    light_percentage = round(light_count / total_checks * 100, 1)
    medium_percentage = round(medium_count / total_checks * 100, 1)
    heavy_percentage = round(heavy_count / total_checks * 100, 1)

    on_time_rate = round(light_count / total_checks * 100, 1)

    recent_checks = [
        {
            "checked_at": log.checked_at,
            "delay_seconds": log.delay_seconds,
            "traffic_status": log.traffic_status,
        }
        for log in sorted(logs, key=lambda log: log.checked_at)[-10:]
    ]

    return Analytics(
        avg_delay_seconds=avg_delay_seconds,
        median_delay_seconds=median_delay_seconds,
        std_dev_delay_seconds=std_dev_delay_seconds,
        max_delay_seconds=max_delay_seconds,
        light_count=light_count,
        medium_count=medium_count,
        heavy_count=heavy_count,
        light_percentage=light_percentage,
        medium_percentage=medium_percentage,
        heavy_percentage=heavy_percentage,
        on_time_rate=on_time_rate,
        total_checks=total_checks,
        recent_checks=recent_checks,
    )
