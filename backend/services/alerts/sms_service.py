from twilio.http import TwilioException
from twilio.rest import Client

from app.config import settings


def send_sms(to_phone, message_body) -> dict:
    account_sid = settings.twilio_account_sid.get_secret_value()
    auth_token = settings.twilio_auth_token.get_secret_value()
    twilio_phone_num = settings.twilio_phone_number.get_secret_value()

    client = Client(account_sid, auth_token)

    try:
        message = client.messages.create(
            body=message_body, from_=twilio_phone_num, to=to_phone
        )
        status = {"success": True, "message_sid": message.sid, "error": None}
    except TwilioException as e:
        status = {"success": False, "message_sid": None, "error": str(e)}
    except Exception as err:
        status = {"success": False, "message_sid": None, "error": str(err)}

    return status
