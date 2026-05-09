const KpiCard = ({ label, value }) => {
  return (
    <div>
      <p>{label}</p>
      <p>{value}</p>
    </div>
  );
};

export default KpiCard;
