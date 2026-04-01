from datetime import datetime

import pytest
from clients.traffic_client import get_travel_time


def test_get_travel_time_success(mock_request_get):
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
    mock_request_get.json.return_value = response_json

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


def test_get_travel_time_failure(mock_request_get):
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

    mock_request_get.json.return_value = response_json

    with pytest.raises(Exception) as e_info:
        get_travel_time(
            origin="fort kochi",
            destination="Office",
            dep_datetime=datetime.now(),
        )

    assert "non-OK status" in str(e_info.value)


def test_missing_traffic_data(mock_request_get):
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

    mock_request_get.json.return_value = response_json

    with pytest.raises(Exception) as e_info:
        get_travel_time(
            origin="fort kochi",
            destination="Office",
            dep_datetime=datetime.now(),
        )

    assert "Traffic data missing" in str(e_info.value)
