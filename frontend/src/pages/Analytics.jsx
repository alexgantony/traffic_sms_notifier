import { useEffect, useState } from 'react';
import { getAnalytics } from '../api/analyticsService';
import { fetchRoutes } from '../api/routeService';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState();
  const [selectedRouteId, setSelectedRouteId] = useState(null);
  const [routes, setRoutes] = useState([]);

  const loadRoutes = async () => {
    const { data, error } = await fetchRoutes();
    setRoutes(data);
  };

  const loadAnalytics = async (routeId) => {
    setLoading(true);
    setError(null);
    const { data, error } = await getAnalytics(routeId);
    if (!error) {
      setAnalytics(data);
    } else {
      setError(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  useEffect(() => {
    if (!selectedRouteId) return;
    loadAnalytics(selectedRouteId);
  }, [selectedRouteId]);

  return (
    <div>
      <div>
        <select onChange={(e) => setSelectedRouteId(e.target.value)}>
          <option value=''>Select a route</option>
          {routes.map((route) => (
            <option key={route.id} value={route.id}>
              {route.name}
            </option>
          ))}
        </select>
      </div>
      <div>Insight text goes here</div>
      <div>KPI Cards goes here</div>
      <div>Line Chart goes here</div>
      <div>Donut + Progress bars goes here</div>
    </div>
  );
};
export default Analytics;
