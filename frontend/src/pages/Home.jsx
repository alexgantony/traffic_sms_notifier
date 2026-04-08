import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

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
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`p-4 rounded-2xl border border-slate-700 shadow-sm cursor-pointer duration-300 mb-6 active:scale-95 transition-all
        ${hovered ? 'bg-slate-700' : 'bg-slate-800'}`}
    >
      <div className='space-y-1 mb-2'>
        <h2 className='text-lg text-[#00df9a] font-semibold'>{routeName}</h2>
        <h2 className='text-lg font-medium'>
          {origin} → {destination}
        </h2>
        <p className='text-slate-400 text-sm'>Check Time: {checkTime}</p>
      </div>
      <div className='flex justify-end gap-2'>
        <button
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setHovered(false)}
          onMouseLeave={() => setHovered(true)}
          className='text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-2 rounded-lg transition-colors duration-200'
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setHovered(false)}
          onMouseLeave={() => setHovered(true)}
          className='text-red-500 hover:text-red-400 hover:bg-red-500/10 p-2 rounded-lg transition-colors duration-200'
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

const Home = () => {
  return (
    <div className='min-h-screen bg-slate-900 text-slate-100 p-4'>
      <div className='max-w-2xl mx-auto px-4'>
        <div className='flex justify-between items-center py-5'>
          <h1 className='font-bold text-4xl'>Route List</h1>
          <button className='flex items-center gap-2 bg-[#00df9a] hover:bg-[#00c589] text-black font-semibold px-4 py-2 rounded-xl cursor-pointer duration-200 active:scale-95 transition-all'>
            <Plus size={18} />
            Add Route
          </button>
        </div>
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
    </div>
  );
};

export default Home;
