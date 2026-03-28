import pytest
from app.auth import get_password_hash
from app.main import app
from db.session import get_session
from fastapi.testclient import TestClient
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

    return {"username": username, "password": password}


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
