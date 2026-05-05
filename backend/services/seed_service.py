from db.engine import engine
from models.traffic import TrafficLog
from sqlmodel import Session, func, select


def seed_traffic_logs_if_empty(db: Session):
    statement = select(func.count()).select_from(TrafficLog)
    log_count = db.exec(statement).one()

    print(log_count)

    if log_count > 0:
        return


if __name__ == "__main__":
    with Session(engine) as session:
        seed_traffic_logs_if_empty(session)
# check if data exists
# if yes → stop
# if no → (later we will seed)
