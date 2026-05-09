import { useEffect, useState } from 'react';
import { getAnalytics } from '../api/analyticsService';
import { fetchRoutes } from '../api/routeService';
import KpiCard from '../components/KpiCard';

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [analytics, setAnalytics] = useState(null);
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
      console.log(data);
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

  const secsToMins = (value) => {
    const mins = parseFloat((value / 60).toFixed(1));
    return mins > 1 ? `${mins} mins` : `${mins} min`;
  };

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
      <div>
        {analytics && (
          <div>
            <KpiCard
              label={'Avg Delay'}
              value={secsToMins(analytics.avg_delay_seconds)}
            ></KpiCard>
            <KpiCard
              label={'Median Delay'}
              value={secsToMins(analytics.median_delay_seconds)}
            ></KpiCard>
            <KpiCard
              label={'On-Time Rate'}
              value={`${analytics.on_time_rate}%`}
            ></KpiCard>
            <KpiCard
              label={'Variability'}
              value={secsToMins(analytics.std_dev_delay_seconds)}
            ></KpiCard>
            <KpiCard
              label={'Worst Delay'}
              value={secsToMins(analytics.max_delay_seconds)}
            ></KpiCard>
            <KpiCard
              label={'Total Checks'}
              value={analytics.total_checks}
            ></KpiCard>
          </div>
        )}
      </div>
      <div>Line Chart goes here</div>
      <div>Donut + Progress bars goes here</div>
    </div>
  );
};
export default Analytics;
