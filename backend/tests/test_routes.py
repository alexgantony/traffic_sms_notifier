# Create route
def test_create_route_success(client, test_user):
    login_response = client.post("/api/token", data=test_user)
    assert login_response.status_code == 200
    token = login_response.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    route_data = {
        "name": "Morning commute",
        "origin": "Home",
        "destination": "Office",
        "check_time": "09:00:00",
    }

    response = client.post("/routes/", json=route_data, headers=headers)
    assert response.status_code == 200
    assert response.json()["name"] == route_data["name"]


# Get routes
def test_get_route_user_specific():
    pass


# Update route
def test_update_route_unauthorized():
    pass


# Delete route
def test_delete_route_success():
    pass
