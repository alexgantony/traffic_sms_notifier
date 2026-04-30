import logging
from contextlib import asynccontextmanager

from api.alerts import alert_router
from api.health import health_router
from api.routes import routes_router
from api.test import test_router
from api.token import token_router
from api.traffic import traffic_router
from api.user import user_router
from db.init_db import create_db_and_tables
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scheduler.traffic_scheduler import start_scheduler, stop_scheduler

logging.basicConfig(level=logging.INFO)


@asynccontextmanager
async def app_lifespan(app: FastAPI):
    logging.info("Creating DB tables...")
    create_db_and_tables()

    logging.info("Starting scheduler...")
    start_scheduler()

    yield

    stop_scheduler()


app = FastAPI(lifespan=app_lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],  # Dev
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(routes_router)
app.include_router(user_router)
app.include_router(token_router)
app.include_router(test_router)
app.include_router(traffic_router)
app.include_router(alert_router)
