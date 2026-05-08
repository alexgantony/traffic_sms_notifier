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
      <h1>Analytics</h1>
    </div>
  );
};
export default Analytics;
