from fastapi import APIRouter

health_router = APIRouter(tags=["Health Check"])


@health_router.get("/health")
def health():
    return {"status": "ok"}
