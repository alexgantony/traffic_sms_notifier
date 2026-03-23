export default function RouteCard({ route }) {
  return (
    <div>
      <h3>{route.name}</h3>
      <p>
        {route.origin} → {route.destination}
      </p>
      <p>Check at: {route.checkAt}</p>
    </div>
  );
}
