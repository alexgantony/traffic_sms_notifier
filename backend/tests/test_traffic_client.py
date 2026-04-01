from datetime import datetime

import pytest
from clients.traffic_client import get_travel_time


def test_get_travel_time_success(mocker):
    response_json = {
        "status": "OK",
        "rows": [
            {
                "elements": [
                    {
                        "status": "OK",
                        "distance": {"value": 1000},
                        "duration": {"value": 1000},
                        "duration_in_traffic": {"value": 1500},
                    }
                ]
            }
        ],
    }
    mock_get = mocker.patch("clients.traffic_client.requests.get")

    # mock the response of the API Client
    mock_response = mocker.Mock()
    mock_response.json.return_value = response_json
    mock_response.raise_for_status.return_value = None

    # set mock api client to return the mocked reponse
    mock_get.return_value = mock_response

    # call function with mock api client
    result = get_travel_time(
        origin="fort kochi",
        destination="Office",
        dep_datetime=datetime.now(),
    )

    expected_result = {
        "distance_meters": 1000,
        "duration_seconds": 1000,
        "duration_in_traffic_seconds": 1500,
    }

    assert result == expected_result


def test_get_travel_time_failure(mocker):
    response_json = {
        "status": "NOT_OK",
        "rows": [
            {
                "elements": [
                    {
                        "status": "OK",
                        "distance": {"value": 1000},
                        "duration": {"value": 1000},
                        "duration_in_traffic": {"value": 1500},
                    }
                ]
            }
        ],
    }

    mock_get = mocker.patch("clients.traffic_client.requests.get")
    mock_response = mocker.Mock()
    mock_response.json.return_value = response_json
    mock_response.raise_for_status.return_value = None
    mock_get.return_value = mock_response

    with pytest.raises(Exception) as e_info:
        get_travel_time(
            origin="fort kochi",
            destination="Office",
            dep_datetime=datetime.now(),
        )

    assert "non-OK status" in str(e_info.value)


def test_missing_traffic_data(mocker):
    response_json = {
        "status": "OK",
        "rows": [
            {
                "elements": [
                    {
                        "status": "OK",
                        "distance": {"value": 1000},
                        "duration": {"value": 1000},
                    }
                ]
            }
        ],
    }

    mock_get = mocker.patch("clients.traffic_client.requests.get")
    mock_response = mocker.Mock()
    mock_response.json.return_value = response_json
    mock_response.raise_for_status.return_value = None
    mock_get.return_value = mock_response

    with pytest.raises(Exception) as e_info:
        get_travel_time(
            origin="fort kochi",
            destination="Office",
            dep_datetime=datetime.now(),
        )

    assert "Traffic data missing" in str(e_info.value)
