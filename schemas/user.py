from pydantic import BaseModel, ConfigDict, Field


class UserBase(BaseModel):
    username: str
    email: str
    full_name: str | None = None


class UserCreate(UserBase):
    password: str = Field(min_length=8)


class UserRead(UserBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
