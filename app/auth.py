from fastapi.security import OAuth2PasswordBearer
from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/token")


def verify_password(plaintext_password: str, hashed_password: str) -> bool:
    return password_hash.verify(plaintext_password, hashed_password)


def get_password_hash(password: str) -> str:
    return password_hash.hash(password=password)
