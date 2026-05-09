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
      <div className='flex justify-center gap-4 mt-2'>
        <span className='flex items-center gap-1 text-xs text-slate-400'>
          <span className='w-2 h-2 rounded-sm bg-[#639922] inline-block'></span>
          Light
        </span>
        <span className='flex items-center gap-1 text-xs text-slate-400'>
          <span className='w-2 h-2 rounded-sm bg-[#EF9F27] inline-block'></span>
          Medium
        </span>
        <span className='flex items-center gap-1 text-xs text-slate-400'>
          <span className='w-2 h-2 rounded-sm bg-[#E24B4A] inline-block'></span>
          Heavy
        </span>
      </div>
    </div>
  );
};

export default TrafficDonutChart;
