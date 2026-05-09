const KpiCard = ({ label, value }) => {
  return (
    <div className='bg-slate-800 rounded-xl p-4 border border-slate-700'>
      <p className='text-slate-400 text-xs uppercase tracking-widest mb-2'>
        {label}
      </p>
      <p className='text-slate-100 text-xl font-bold'>{value}</p>
    </div>
  );
};

export default KpiCard;
