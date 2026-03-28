def test_login_success(client, test_user):
    response = client.post("/api/token", data=test_user)

    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"
