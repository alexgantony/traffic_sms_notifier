import './RouteCard.css';

export default function RouteCard({ route }) {
  return (
    <div className='route-card'>
      <h3>{route.name}</h3>
      <p>
        {route.origin} → {route.destination}
      </p>
      <p>Check at: {route.checkAt}</p>
    </div>
  );
}
