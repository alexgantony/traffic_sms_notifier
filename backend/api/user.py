from app.auth import get_password_hash
from db.session import SessionDep
from fastapi import APIRouter, HTTPException
from models.user import User
from schemas.user import UserCreate, UserRead
from sqlalchemy.exc import IntegrityError

user_router = APIRouter(prefix="/users", tags=["Users"])


# user registration
# UserCreate → hash(password) → User(table) → DB
@user_router.post("/", response_model=UserRead)
def create_user(user: UserCreate, session: SessionDep):
    try:
        new_user = User(
            username=user.username,
            email=user.email,
            password_hash=get_password_hash(user.password),
            phone_number=user.phone_number,
        )

        session.add(new_user)
        session.commit()
        session.refresh(new_user)
        return new_user
    except IntegrityError:
        session.rollback()
        raise HTTPException(status_code=400, detail="Username or email already exists")
