from datetime import timedelta
from typing import Annotated

from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm

from app.auth import authenticate_user, create_access_token
from app.config import settings
from db.session import SessionDep

token_router = APIRouter(tags=["Authentication"])


@token_router.post("/token")
async def login(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()], db: SessionDep
) -> dict:
    user = authenticate_user(
        db, username=form_data.username, password=form_data.password
    )

    if user is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    else:
        access_token = create_access_token()

    return {"access_token": access_token, "token_type": "bearer"}
