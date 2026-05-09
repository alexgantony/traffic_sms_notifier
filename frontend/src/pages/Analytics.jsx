import { useEffect, useState } from 'react';
import { getAnalytics } from '../api/analyticsService';
import { fetchRoutes } from '../api/routeService';
import KpiCard from '../components/KpiCard';
import TrafficDonutChart from '../components/TrafficDonutChart';
import ProgressBars from '../components/TrafficProgressionBars';
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
    <div className='min-h-screen bg-slate-900 text-slate-100 p-4'>
      <div className='max-w-2xl mx-auto px-4 space-y-6'>
        <div className='flex justify-between items-center py-5'>
          <h1 className='font-bold text-4xl'>Analytics</h1>
        </div>

        <select
          onChange={(e) => setSelectedRouteId(e.target.value)}
          className='w-full bg-slate-800 text-slate-100 border border-slate-700 rounded-xl px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-[#00df9a] cursor-pointer'
        >
          <option value=''>Select a route</option>
          {routes.map((route) => (
            <option key={route.id} value={route.id}>
              {route.name}
            </option>
          ))}
        </select>

        {!selectedRouteId && (
          <p className='text-center text-slate-400 mt-10'>
            Select a route to view analytics
          </p>
        )}

        {analytics && (
          <>
            <div className='border-l-4 border-[#00df9a] bg-slate-800 rounded-r-xl px-4 py-3'>
              <p className='text-slate-100 text-sm leading-relaxed'>
                {generateInsightText(
                  analytics.heavy_percentage,
                  analytics.on_time_rate,
                  secsToMins(analytics.avg_delay_seconds),
                )}
              </p>
            </div>

            <div>
              <p className='text-slate-400 text-xs uppercase tracking-widest mb-3'>
                At a glance
              </p>
              <div className='grid grid-cols-2 gap-3 sm:grid-cols-3'>
                <KpiCard
                  label='Avg Delay'
                  value={secsToMins(analytics.avg_delay_seconds)}
                />
                <KpiCard
                  label='Median Delay'
                  value={secsToMins(analytics.median_delay_seconds)}
                />
                <KpiCard
                  label='On-Time Rate'
                  value={`${analytics.on_time_rate}%`}
                />
                <KpiCard
                  label='Variability'
                  value={secsToMins(analytics.std_dev_delay_seconds)}
                />
                <KpiCard
                  label='Worst Delay'
                  value={secsToMins(analytics.max_delay_seconds)}
                />
                <KpiCard label='Total Checks' value={analytics.total_checks} />
              </div>
            </div>

            <div className='bg-slate-800 rounded-xl p-4'>
              <p className='text-slate-400 text-xs uppercase tracking-widest mb-4'>
                Delay over last 10 checks
              </p>
              <TrafficLineChart recentChecks={analytics.recent_checks} />
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
              <div className='bg-slate-800 rounded-xl p-4'>
                <p className='text-slate-400 text-xs uppercase tracking-widest mb-4'>
                  Traffic distribution
                </p>
                <TrafficDonutChart
                  lightCount={analytics.light_count}
                  mediumCount={analytics.medium_count}
                  heavyCount={analytics.heavy_count}
                />
              </div>

              <div className='bg-slate-800 rounded-xl p-4'>
                <p className='text-slate-400 text-xs uppercase tracking-widest mb-4'>
                  Traffic Breakdown
                </p>
                <ProgressBars
                  lightCount={analytics.light_count}
                  mediumCount={analytics.medium_count}
                  heavyCount={analytics.heavy_count}
                  totalChecks={analytics.total_checks}
                  lightPercentage={analytics.light_percentage}
                  mediumPercentage={analytics.medium_percentage}
                  heavyPercentage={analytics.heavy_percentage}
                />
              </div>
            </div>
          </>
        )}

        {loading && selectedRouteId && (
          <p className='text-center text-slate-400 mt-10'>
            Loading analytics...
          </p>
        )}

        {error && (
          <p className='text-center text-red-400 mt-10'>
            Failed to load analytics
          </p>
        )}
      </div>
    </div>
  );
};

export default Analytics;
