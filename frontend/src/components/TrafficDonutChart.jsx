import { Cell, Pie, PieChart, ResponsiveContainer } from 'recharts';

const TrafficDonutChart = ({ lightCount, mediumCount, heavyCount }) => {
  const COLORS = ['#639922', '#EF9F27', '#E24B4A'];
  const chartData = [
    { name: 'Light', value: lightCount },
    { name: 'Medium', value: mediumCount },
    { name: 'Heavy', value: heavyCount },
  ];
  return (
    <div>
      <ResponsiveContainer width='100%' height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey='value'
            nameKey='name'
            outerRadius='80%'
            innerRadius='60%'
            isAnimationActive={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={index} fill={COLORS[index]} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TrafficDonutChart;
