import logging

from apscheduler.schedulers.background import BackgroundScheduler
from sqlmodel import Session, select

from db.engine import engine
from models.route import Route

logger = logging.getLogger(__name__)
scheduler = BackgroundScheduler()


def load_routes():
    with Session(engine) as session:
        # load all routes
        routes = list(session.exec(select(Route)))
        return routes


# function to start scheduler
def start_scheduler():
    scheduler.start()
    logger.info("Scheduler started")


# functions to shutdown scheduler
def stop_scheduler():
    if scheduler.running:
        scheduler.shutdown()
        logger.info("Scheduler stopped")
