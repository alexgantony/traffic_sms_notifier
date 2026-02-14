from contextlib import asynccontextmanager

from fastapi import FastAPI

from api.health import health_router
from db.session import create_db_and_tables


@asynccontextmanager
async def app_lifespan(app: FastAPI):
    # code to execute when app is loading
    create_db_and_tables()
    yield
    # code to execute when app is shutting down


app = FastAPI(lifespan=app_lifespan)
app.include_router(health_router)
