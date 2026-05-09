const ProgressBars = ({
  lightCount,
  mediumCount,
  heavyCount,
  totalChecks,
  lightPercentage,
  mediumPercentage,
  heavyPercentage,
}) => {
  const bars = [
    {
      label: 'Light',
      count: lightCount,
      percentage: lightPercentage,
      color: '#639922',
    },
    {
      label: 'Medium',
      count: mediumCount,
      percentage: mediumPercentage,
      color: '#EF9F27',
    },
    {
      label: 'Heavy',
      count: heavyCount,
      percentage: heavyPercentage,
      color: '#E24B4A',
    },
  ];

  return (
    <div className='space-y-4'>
      {bars.map((bar) => (
        <div key={bar.label}>
          <div className='flex justify-between mb-1.5'>
            <span className='text-sm text-slate-300'>{bar.label}</span>
            <span className='text-sm text-slate-400'>
              {bar.count}/{totalChecks} · {bar.percentage}%
            </span>
          </div>
          <div className='bg-slate-700 rounded-full h-2'>
            <div
              style={{ width: `${bar.percentage}%`, background: bar.color }}
              className='h-2 rounded-full'
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBars;
