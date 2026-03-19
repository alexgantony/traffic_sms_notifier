from datetime import datetime, time
from zoneinfo import ZoneInfo


def ist_to_utc(time_ist: time) -> time:
    # UTC_minutes = (IST_minutes - 330) % 1440
    time_ist_mins = time_ist.minute + (time_ist.hour * 60)
    ist_timezone_mins = 330
    day_in_mins = 1440

    utc_mins = time_ist_mins - ist_timezone_mins

    utc_time = utc_mins % day_in_mins

    utc_hour = utc_time // 60
    utc_min = utc_time % 60

    return time(utc_hour, utc_min)


def utc_to_ist(time_utc: time) -> time:
    # IST_minutes = (UTC_minutes + 330) % 1440
    time_utc_mins = time_utc.minute + (time_utc.hour * 60)
    ist_timezone_mins = 330
    day_in_mins = 1440

    ist_mins_total = (time_utc_mins + ist_timezone_mins) % day_in_mins

    ist_hour = ist_mins_total // 60
    ist_mins = ist_mins_total % 60

    return time(ist_hour, ist_mins)


def datetime_utc_to_ist(dt_utc: datetime) -> datetime:
    ist_dt = dt_utc.astimezone(ZoneInfo("Asia/Kolkata"))

    return ist_dt
