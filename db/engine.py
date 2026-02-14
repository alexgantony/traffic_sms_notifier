from pathlib import Path

from sqlmodel import create_engine

db_dir = Path("db/")
sqlite_file_name = db_dir / "database.db"
# connection URL
sqlite_url = f"sqlite:///{sqlite_file_name}"

connect_args = {"check_same_thread": False}
engine = create_engine(sqlite_url, connect_args=connect_args)
