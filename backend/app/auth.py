from datetime import datetime, timedelta, timezone

import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jwt.exceptions import InvalidTokenError
from pwdlib import PasswordHash
from sqlmodel import select

from app.config import settings
from db.session import SessionDep
from models.route import Route
from models.user import User

password_hash = PasswordHash.recommended()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/token")


def verify_password(plaintext_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plaintext_password, hashed_password)


def get_password_hash(password: str) -> str:
    return password_hash.hash(password=password)


def get_user(db: SessionDep, username: str) -> User | None:
    statement = select(User).where(User.username == username)
    return db.exec(statement).first()


def authenticate_user(db: SessionDep, username: str, password: str) -> User | None:
    user = get_user(db, username)

    if user is None:
        return None

    if not verify_password(password, user.password_hash):
        return None
    return user


def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()

    if expires_delta:
        expire = datetime.now(timezone.utc) + expires_delta
    else:
        expire = datetime.now(timezone.utc) + timedelta(
            minutes=settings.access_token_expiry_mins
        )

    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(
        to_encode, settings.secret_key.get_secret_value(), algorithm=settings.algorithm
    )
    return encoded_jwt


def get_current_user(db: SessionDep, token: str = Depends(oauth2_scheme)) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            token,
            settings.secret_key.get_secret_value(),
            algorithms=[settings.algorithm],
        )
        username: str | None = payload.get("sub")

        if username is None:
            raise credentials_exception

    except InvalidTokenError:
        raise credentials_exception

    user = get_user(db, username)
    if user is None:
        raise credentials_exception
    return user


def get_owned_route(
    route_id: int, db: SessionDep, user: User = Depends(get_current_user)
):
    route = db.get(Route, route_id)

    if route is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Route not found"
        )

    if route.user_id != user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Not authorized to access this route",
        )
    return route
