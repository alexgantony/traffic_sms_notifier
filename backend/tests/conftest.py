from datetime import time

import pytest
from app.auth import get_password_hash
from app.main import app
from db.session import get_session
from fastapi.testclient import TestClient
from models.route import Route
from models.user import User
from sqlmodel import Session, SQLModel, create_engine
from sqlmodel.pool import StaticPool


@pytest.fixture
def engine():
    # create engine
    connect_args = {"check_same_thread": False}
    test_engine = create_engine(
        "sqlite:///:memory:", connect_args=connect_args, poolclass=StaticPool
    )

    # Create tables
    SQLModel.metadata.create_all(test_engine)

    return test_engine


@pytest.fixture
def session(engine):
    with Session(engine) as session:
        yield session


@pytest.fixture
def test_user(session):
    username = "test"
    password = "12345678"
    test_user = User(
        username=username,
        password_hash=get_password_hash(password),
        email="test@123.com",
        phone_number="+12345567890",
    )

    session.add(test_user)
    session.commit()
    session.refresh(test_user)

    return {"user_id": test_user.id, "username": username, "password": password}


@pytest.fixture
def test_route(session, test_user):
    test_route = Route(
        name="test route",
        origin="home",
        destination="office",
        check_time=time(hour=9, second=00),
        user_id=test_user["user_id"],
    )

    session.add(test_route)
    session.commit()
    session.refresh(test_route)

    return {"route_id": test_route.id}


@pytest.fixture
def client(engine):
    # define override for get_session
    def override_get_session():
        with Session(engine) as session:
            yield session

    # apply override
    app.dependency_overrides[get_session] = override_get_session
    with TestClient(app) as c:
        yield c

    # Clear overrides
    app.dependency_overrides.clear()


@pytest.fixture
def auth_header(client, test_user):
    login_response = client.post("/api/token", data=test_user)
    assert login_response.status_code == 200
    token = login_response.json()["access_token"]

    return {"Authorization": f"Bearer {token}"}


@pytest.fixture
def base_route():
    return Route(
        id=1,
        name="Test Route",
        origin="A",
        destination="B",
        check_time=time(9, 0),
        user_id=1,
    )


@pytest.fixture
def mock_travel_time(mocker):
    return mocker.patch("services.traffic_service.get_travel_time")


@pytest.fixture
def mock_request_get(mocker):
    mock_get = mocker.patch("clients.traffic_client.requests.get")
    mock_response = mocker.Mock()
    mock_response.raise_for_status.return_value = None
    mock_get.return_value = mock_response

    return mock_response
