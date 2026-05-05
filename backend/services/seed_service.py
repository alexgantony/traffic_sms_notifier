import csv
import logging
from datetime import datetime
from pathlib import Path

from models.traffic import TrafficLog
from sqlmodel import Session, func, select

logger = logging.getLogger(__name__)


def seed_traffic_logs_if_empty(db: Session):
    statement = select(func.count()).select_from(TrafficLog)
    log_count = db.exec(statement).one()

    if log_count > 0:
        logger.info("Traffic logs already exist, skipping seed")
        return

    try:
        seed_traffic_log_loc = (
            Path(__file__).resolve().parent.parent / "seed" / "trafficlog.csv"
        )
        logger.info("Seeding traffic logs...")

        with open(seed_traffic_log_loc) as file:
            csv_reader = csv.DictReader(file)

            for row in csv_reader:
                traffic_obj = TrafficLog(
                    route_id=int(row["route_id"]),
                    checked_at=datetime.strptime(
                        row["checked_at"], "%Y-%m-%d %H:%M:%S.%f"
                    ),
                    duration_in_traffic=int(row["duration_in_traffic"]),
                    normal_traffic_duration=int(row["normal_traffic_duration"]),
                    delay_seconds=int(row["delay_seconds"]),
                    traffic_status=row["traffic_status"],
                    distance_meters=int(row["distance_meters"]),
                )

                db.add(traffic_obj)

            db.commit()
            logger.info("Seeding completed")

    except Exception as e:
        logger.error(f"Seeding failed: {e}")
