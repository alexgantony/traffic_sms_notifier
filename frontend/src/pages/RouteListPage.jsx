import RouteCard from '../components/RouteCard';
import routes from '../data/routes';

export default function RouteList() {
  return (
    <div>
      {routes.map((route) => (
        <RouteCard key={route.id} route={route} />
      ))}
    </div>
  );
}
