const RouteCard = ({ routeName, origin, destination, time }) => {
  return (
    <div className='bg-slate-800 p-4 rounded-2xl space-y-1'>
      <h2>{`Route Name: ${routeName}`}</h2>
      <h2 className='text-lg font-medium'>
        {origin} → {destination}
      </h2>
      <h2>{`Check Time: ${time}`}</h2>
    </div>
  );
};

const Home = () => {
  return (
    <div className='min-h-screen bg-slate-900 text-slate-100 p-4'>
      <h1 className='bg-red-500 text-white p-4'>Home Page</h1>

      <RouteCard
        routeName='Home'
        origin='Fort Kochi'
        destination='Destination'
        time='09:00'
      />

      <RouteCard
        routeName='Home'
        origin='Fort Kochi'
        destination='Destination'
        time='09:00'
      />

      <RouteCard
        routeName='Home'
        origin='Fort Kochi'
        destination='Destination'
        time='09:00'
      />
    </div>
  );
};

export default Home;
