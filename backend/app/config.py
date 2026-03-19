from pydantic import SecretStr
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(
        env_file=".env", env_file_encoding="utf-8", extra="ignore"
    )

    secret_key: SecretStr
    algorithm: str = "HS256"
    access_token_expiry_mins: int = 30

    google_backend_api_key: SecretStr
    google_frontend_api_key: SecretStr

    twilio_account_sid: SecretStr
    twilio_auth_token: SecretStr
    twilio_phone_number: SecretStr

    sms_enabled: bool = False


settings = Settings()  # type: ignore[call-arg] # Loaded from .env file
