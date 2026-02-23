from fastapi import APIRouter

from app.auth import get_password_hash
from db.session import SessionDep
from models.user import User, UserCreate, UserRead

user_router = APIRouter(prefix="/users", tags=["Users"])


# user registration
# UserCreate → hash(password) → User(table) → DB
@user_router.post("/", response_model=UserRead)
def create_user(user: UserCreate, session: SessionDep):
    new_user = User(
        username=user.username,
        email=user.email,
        password_hash=get_password_hash(user.password),
    )

    session.add(new_user)
    session.commit()
    session.refresh(new_user)
    return new_user
