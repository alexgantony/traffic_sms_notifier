# Create route
def test_create_route_success(client, auth_header):
    route_data = {
        "name": "Morning commute",
        "origin": "Home",
        "destination": "Office",
        "check_time": "09:00:00",
    }

    response = client.post("/routes/", json=route_data, headers=auth_header)
    assert response.status_code == 200
    assert response.json()["name"] == route_data["name"]


# Get routes
def test_get_route_user_specific(client, auth_header):
    route_list = [
        {
            "name": "Morning commute",
            "origin": "Home",
            "destination": "Office",
            "check_time": "09:00:00",
        },
        {
            "name": "Afternoon commute",
            "origin": "Home",
            "destination": "Office",
            "check_time": "13:00:00",
        },
        {
            "name": "Evening commute",
            "origin": "Home",
            "destination": "Office",
            "check_time": "19:00:00",
        },
    ]

    for route in route_list:
        create_route_response = client.post("/routes/", json=route, headers=auth_header)
        assert create_route_response.status_code == 200

    response = client.get("/routes/", headers=auth_header)
    assert response.status_code == 200
    assert len(response.json()) == len(route_list)


# Update route
def test_update_route_unauthorized():
    pass


# Delete route
def test_delete_route_success():
    pass
