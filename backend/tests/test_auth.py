def test_login_success(client, test_user):
    response = client.post("/api/token", data=test_user)

    assert response.status_code == 200
    assert "access_token" in response.json()
    assert response.json()["token_type"] == "bearer"


def test_login_failure(client, test_user):
    test_user_wrong = test_user.copy()
    test_user_wrong["password"] = "wrong"
    response = client.post("/api/token", data=test_user_wrong)

    assert response.status_code == 401
    assert "access_token" not in response.json()
    assert response.json()["detail"] == "Invalid username or password"
