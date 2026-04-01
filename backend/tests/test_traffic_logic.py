import pytest
from services.traffic_service import check_traffic


@pytest.mark.parametrize(
    "duration_in_traffic_seconds, expected_status",
    [(1200, "Light"), (1800, "Medium"), (2100, "Heavy")],
)
def test_traffic_logic(
    mock_travel_time, base_route, duration_in_traffic_seconds, expected_status
):
    mock_travel_time.return_value = {
        "distance_meters": 12000,
        "duration_seconds": 1000,
        "duration_in_traffic_seconds": duration_in_traffic_seconds,
    }

    result = check_traffic(base_route)
    assert result.traffic_status == expected_status
