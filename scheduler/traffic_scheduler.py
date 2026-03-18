import logging
from datetime import datetime, timezone

from apscheduler.schedulers.background import BackgroundScheduler
from sqlmodel import Session, select

from db.engine import engine
from models.route import Route
from models.traffic import TrafficLog
from services.traffic_service import check_and_save_traffic

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
            if (
                curr_datetime.hour == route.check_time.hour
                and curr_datetime.minute == route.check_time.minute
            ):
                last_log = session.exec(
                    select(TrafficLog.checked_at)
                    .where(TrafficLog.route_id == route.id)
                    .order_by(TrafficLog.checked_at.desc())  # type: ignore
                ).first()

                if last_log is not None and (
                    last_log.date() == curr_datetime.date()
                    and last_log.hour == curr_datetime.hour
                    and last_log.minute == curr_datetime.minute
                ):
                    continue

                check_and_save_traffic(route.id)
                logger.info(f"Traffic check triggered for route {route.id}")
