import { Pencil, Plus, Trash2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { createRoute, fetchRoutes } from '../api/routeService';
import Modal from '../components/Modal';

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
        <p className='text-slate-400 text-sm'>Check Time - {checkTime}</p>
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
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const loadRoutes = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetchRoutes();
      if (!response.error) {
        setRoutes(response.data);
      } else {
        setError(response.error);
      }
    } catch (err) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateRoute = async (data) => {
    try {
      await createRoute(data);

      setIsModalOpen(false);

      loadRoutes();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadRoutes();
  }, []);

  return (
    <div className='min-h-screen bg-slate-900 text-slate-100 p-4'>
      <div className='max-w-2xl mx-auto px-4'>
        <div className='flex justify-between items-center py-5'>
          <h1 className='font-bold text-4xl'>Route List</h1>
          <button
            className='flex items-center gap-2 bg-[#00df9a] hover:bg-[#00c589] text-black font-semibold px-4 py-2 rounded-xl cursor-pointer duration-200 active:scale-95 transition-all'
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={18} />
            Add Route
          </button>
        </div>
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onSubmit={handleCreateRoute}
        />
        <div className='space-y-4'>
          {loading ? (
            <p className='text-center text-slate-400 mt-10'>
              Loading routes...
            </p>
          ) : error ? (
            <p className='text-center text-slate-400 mt-10'>
              Failed to load routes
            </p>
          ) : routes.length === 0 ? (
            <p className='text-center text-slate-400 mt-10'>
              No routes found. Add your first route.
            </p>
          ) : (
            routes.map((route) => (
              <RouteCard
                key={route.id}
                routeName={route.name}
                origin={route.origin}
                destination={route.destination}
                checkTime={route.checkTime}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
