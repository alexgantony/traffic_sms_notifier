import logging
from datetime import time

from apscheduler.jobstores.base import JobLookupError
from apscheduler.schedulers.background import BackgroundScheduler
from sqlmodel import Session, select

from db.engine import engine
from models.route import Route
from services.traffic_service import check_and_save_traffic

logger = logging.getLogger(__name__)
scheduler = BackgroundScheduler()


def load_routes():
    with Session(engine) as session:
        # load all routes
        routes = list(session.exec(select(Route)))
        return routes


# function to add jobs
def add_route_job(route_id: int, check_time: time):
    hour = check_time.hour
    minute = check_time.minute

    try:
        scheduler.add_job(
            check_and_save_traffic,
            trigger="cron",
            hour=hour,
            minute=minute,
            args=[route_id],
            id=f"route_{route_id}",
            replace_existing=True,
        )
        logger.info(
            "Scheduled traffic check for route %s at %s",
            route_id,
            check_time,
        )
    except Exception as e:
        logger.error("Failed to schedule the traffic job for route %s: %s", route_id, e)


# function to start scheduler and load routes
def start_scheduler():
    print("Scheduler STARTED - loading routes...")
    routes = load_routes()

    for route in routes:
        assert route.id is not None
        add_route_job(route.id, route.check_time)

    scheduler.start()
    logger.info("Scheduler started with %s scheduled route check", len(routes))


# function to remove jobs
def remove_route_job(route_id: int):
    try:
        scheduler.remove_job(job_id=f"route_{route_id}")
        logger.info("Removed scheduler job for route %s", route_id)
    except JobLookupError:
        logger.warning("Scheduler job for route %s not found", route_id)


# functions to shutdown scheduler
def stop_scheduler():
    if scheduler.running:
        scheduler.shutdown()
        logger.info("Scheduler stopped")
