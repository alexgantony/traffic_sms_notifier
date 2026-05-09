import {
  CartesianGrid,
  Line,
  LineChart,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function TrafficLineChart({ recentCheck }) {
  const chartData = recentCheck
    .sort((a, b) => new Date(a.checked_at) - new Date(b.checked_at))
    .map((item) => ({
      date: new Date(item.checked_at).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: '2-digit',
      }),
      delay: parseFloat((item.delay_seconds / 60).toFixed(1)),
      traffic_status: item.traffic_status,
    }));

  return (
    <LineChart
      style={{
        width: '100%',
        maxWidth: '700px',
        height: '100%',
        maxHeight: '70vh',
        aspectRatio: 1.618,
      }}
      responsive
      data={chartData}
      margin={{
        top: 5,
        right: 0,
        left: 0,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray='3 3' stroke='var(--color-border-3)' />
      <XAxis dataKey='date' stroke='var(--color-text-3)' />
      <YAxis width='auto' stroke='var(--color-text-3)' />
      <Tooltip
        cursor={{
          stroke: 'var(--color-border-2)',
        }}
        contentStyle={{
          backgroundColor: 'var(--color-surface-raised)',
          borderColor: 'var(--color-border-2)',
        }}
      />
      <Line
        type='monotone'
        dataKey='delay'
        stroke='#3b82f6'
        strokeWidth={3}
        dot={{
          fill: 'var(--color-surface-base)',
        }}
        activeDot={{ r: 8, stroke: 'var(--color-surface-base)' }}
      />
    </LineChart>
  );
}
