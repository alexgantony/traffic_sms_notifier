import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export default function TrafficLineChart({ recentChecks }) {
  if (!recentChecks) return null;

  const chartData = recentChecks
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
    <ResponsiveContainer width='100%' height={250}>
      <LineChart
        data={chartData}
        margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray='3 3' stroke='#334155' />
        <XAxis dataKey='date' tick={{ fill: '#94a3b8', fontSize: 11 }} />
        <YAxis
          width={70}
          tick={{ fill: '#94a3b8', fontSize: 11 }}
          label={{
            value: 'Delay (mins)',
            angle: -90,
            position: 'insideLeft',
            fill: '#94a3b8',
            fontSize: 11,
            dx: 10,
          }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#1e293b',
            borderColor: '#334155',
            borderRadius: '8px',
          }}
          labelStyle={{ color: '#94a3b8' }}
          itemStyle={{ color: '#00df9a' }}
          formatter={(value, name, props) => [
            <span>
              {value} mins <br /> Traffic: {props.payload.traffic_status}
            </span>,
            'Delay',
          ]}
        />
        <Line
          type='monotone'
          dataKey='delay'
          stroke='#378ADD'
          strokeWidth={2}
          dot={{ fill: '#378ADD', r: 4 }}
          activeDot={{ r: 6, stroke: '#00df9a' }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
