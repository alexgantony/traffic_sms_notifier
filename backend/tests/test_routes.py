from app.auth import get_password_hash
from models.user import User


def login(user):
    assert user.status_code == 200
    assert "access_token" in user.json()
    assert user.json()["token_type"] == "bearer"
    return user.json()["access_token"]


# # Create route
# def test_create_route_success(client, auth_header):
#     route_data = {
#         "name": "Morning commute",
#         "origin": "Home",
#         "destination": "Office",
#         "check_time": "09:00:00",
#     }

#     response = client.post("/routes/", json=route_data, headers=auth_header)
#     assert response.status_code == 200
#     assert response.json()["name"] == route_data["name"]


# # Get routes
# def test_get_route_user_specific(client, auth_header):
#     route_list = [
#         {
#             "name": "Morning commute",
#             "origin": "Home",
#             "destination": "Office",
#             "check_time": "09:00:00",
#         },
#         {
#             "name": "Afternoon commute",
#             "origin": "Home",
#             "destination": "Office",
#             "check_time": "13:00:00",
#         },
#         {
#             "name": "Evening commute",
#             "origin": "Home",
#             "destination": "Office",
#             "check_time": "19:00:00",
#         },
#     ]

#     for route in route_list:
#         create_route_response = client.post("/routes/", json=route, headers=auth_header)
#         assert create_route_response.status_code == 200

#     response = client.get("/routes/", headers=auth_header)
#     assert response.status_code == 200
#     assert len(response.json()) == len(route_list)


# Unauthorized update route
def test_update_route_unauthorized(client, session, test_user):
    user_B = User(
        username="userB",
        full_name="user B testing",
        email="test@test.com",
        password_hash=get_password_hash("9876543210"),
        phone_number="1234567890",
    )

    session.add(user_B)
    session.commit()
    session.refresh(user_B)

    user_B_login = {
        "username": user_B.username,
        "password": "9876543210",
    }

    route_data = {
        "name": "Morning commute",
        "origin": "Home",
        "destination": "Office",
        "check_time": "09:00:00",
    }

    login_user_A = client.post("/api/token", data=test_user)
    token_A = login(login_user_A)

    login_user_B = client.post("/api/token", data=user_B_login)
    token_B = login(login_user_B)

    create_route_response = client.post(
        "/routes/",
        json=route_data,
        headers={"Authorization": f"Bearer {token_B}"},
    )

    assert create_route_response.status_code == 200

    route_id = create_route_response.json()["id"]
    update_route_response = client.patch(
        f"/routes/{route_id}",
        json={"name": "Commute - Office"},
        headers={"Authorization": f"Bearer {token_A}"},
    )

    assert update_route_response.status_code == 403


# Delete route
def test_delete_route_success():
    pass
