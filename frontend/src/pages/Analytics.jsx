import { useEffect, useState } from 'react';
import { getAnalytics } from '../api/analyticsService';
import { fetchRoutes } from '../api/routeService';
import KpiCard from '../components/KpiCard';
import TrafficDonutChart from '../components/TrafficDonutChart';
import TrafficLineChart from '../components/TraffricLineChart';

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

  const generateInsightText = (heavyPercentage, onTimeRate, avg) => {
    if (heavyPercentage > 50) {
      return `Heavy traffic ${heavyPercentage}% of the time on this route. Expect significant delays averaging ${avg}, consider an alternative if possible.`;
    } else if (onTimeRate >= 60) {
      return `This route is on time ${onTimeRate}% of the time with an average delay of ${avg}. A reliable choice for your commute.`;
    } else {
      return `Mixed conditions on this route. On-time ${onTimeRate}% of the time with an average delay of ${avg}, plan for some buffer time.`;
    }
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
      <div>
        <p>
          {analytics &&
            generateInsightText(
              analytics.heavy_percentage,
              analytics.on_time_rate,
              secsToMins(analytics.avg_delay_seconds),
            )}
        </p>
      </div>
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
      <div>
        {analytics && (
          <TrafficLineChart recentChecks={analytics.recent_checks} />
        )}
      </div>
      <div>
        {analytics && (
          <TrafficDonutChart
            lightCount={analytics.light_count}
            mediumCount={analytics.medium_count}
            heavyCount={analytics.heavy_count}
          />
        )}
      </div>
    </div>
  );
};
export default Analytics;
