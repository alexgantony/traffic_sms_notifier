const routes = [
  {
    id: 1,
    name: 'Morning Commute',
    origin: 'Fort Kochi',
    destination: 'Kakkanad',
    checkTime: '08:30',
  },
  {
    id: 2,
    name: 'Office Return',
    origin: 'Kakkanad',
    destination: 'Fort Kochi',
    checkTime: '18:00',
  },
  {
    id: 3,
    name: 'Gym Route',
    origin: 'Edappally',
    destination: 'Kaloor',
    checkTime: '19:30',
  },
];

const RouteCard = ({ routeName, origin, destination, checkTime }) => {
  return (
    <div className='bg-slate-800 p-4 rounded-2xl space-y-1 border border-slate-700 space-y-2 shadow-sm'>
      <h2>{`${routeName}`}</h2>
      <h2 className='text-lg font-medium'>
        {origin} → {destination}
      </h2>
      <h2>{`Check Time: ${checkTime}`}</h2>
    </div>
  );
};

const Home = () => {
  return (
    <div className='min-h-screen bg-slate-900 text-slate-100 p-4'>
      <div className='space-y-4'>
        {routes.map((route) => (
          <RouteCard
            key={route.id}
            routeName={route.name}
            origin={route.origin}
            destination={route.destination}
            checkTime={route.checkTime}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
