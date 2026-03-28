import pytest
from app.main import app
from db.session import get_session
from fastapi.testclient import TestClient
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool


@pytest.fixture
def client():
    # create engine
    connect_args = {"check_same_thread": False}
    test_engine = create_engine(
        "sqlite:///:memory:", connect_args=connect_args, poolclass=StaticPool
    )

    # Create tables
    SQLModel.metadata.create_all(test_engine)

    # define override for get_session
    def override_get_session():
        with Session(test_engine) as session:
            yield session

    # apply override
    app.dependency_overrides[get_session] = override_get_session
    with TestClient(app) as c:
        yield c

    # Clear overrides
    app.dependency_overrides.clear()
