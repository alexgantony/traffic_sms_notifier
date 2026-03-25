import logging
from datetime import datetime, timezone

from apscheduler.schedulers.background import BackgroundScheduler
from db.engine import engine
from models.route import Route
from models.traffic import TrafficLog
from services.traffic_service import check_and_save_traffic
from sqlmodel import Session, select

logger = logging.getLogger(__name__)
scheduler = BackgroundScheduler()


# function to start scheduler
def start_scheduler():
    scheduler.add_job(
        process_routes,
        trigger="interval",
        seconds=60,
        id="process_routes_job",
        replace_existing=True,
    )
    scheduler.start()
    logger.info("Scheduler started")


# functions to shutdown scheduler
def stop_scheduler():
    if scheduler.running:
        scheduler.shutdown()
        logger.info("Scheduler stopped")


def process_routes():
    curr_datetime = datetime.now(timezone.utc)
    logger.info("Scheduler tick started")

    with Session(engine) as session:
        # load routes
        routes = list(session.exec(select(Route)))

        # checking for current time and duplicates
        for route in routes:
            assert route.id is not None

            route_datetime = curr_datetime.replace(
                hour=route.check_time.hour,
                minute=route.check_time.minute,
                second=0,
                microsecond=0,
            )

            # check if within 60-second window
            if 0 <= (curr_datetime - route_datetime).total_seconds() <= 60:
                last_log = session.exec(
                    select(TrafficLog.checked_at)
                    .where(TrafficLog.route_id == route.id)
                    .order_by(TrafficLog.checked_at.desc())  # type: ignore
                ).first()

                if last_log is not None:
                    last_log = last_log.replace(tzinfo=timezone.utc)

                    if 0 <= (curr_datetime - last_log).total_seconds() <= 60:
                        continue

                check_and_save_traffic(route.id)
                logger.info(f"Traffic check triggered for route {route.id}")
