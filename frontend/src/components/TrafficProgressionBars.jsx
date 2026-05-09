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
    <div>
      {bars.map((bar) => (
        <div key={bar.label}>
          <div>
            <span>{bar.label}</span>
            <span>
              {bar.count}/{totalChecks} · {bar.percentage}%
            </span>
          </div>
          <div
            style={{
              background: '#e0e0e0',
              borderRadius: '4px',
              height: '8px',
            }}
          >
            <div
              style={{
                width: `${bar.percentage}%`,
                background: bar.color,
                height: '8px',
                borderRadius: '4px',
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBars;
