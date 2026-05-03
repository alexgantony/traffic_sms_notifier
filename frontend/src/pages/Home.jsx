import { Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  createRoute,
  deleteRoute,
  fetchRoutes,
  updateRoute,
} from '../api/routeService';
import Modal from '../components/Modal';
import RouteCard from '../components/RouteCard';

const Home = () => {
  const [routes, setRoutes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [mode, setMode] = useState('create');

  const loadRoutes = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchRoutes();
      setRoutes(data);
    } catch (err) {
      setError(err.message || 'Unexpected error');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateRoute = async (data) => {
    try {
      await createRoute(data);

      setIsModalOpen(false);
      setSelectedRoute(null);
      setMode('create');

      loadRoutes();
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateRoute = async (data, id) => {
    try {
      await updateRoute(data, id);

      setIsModalOpen(false);
      setSelectedRoute(null);
      setMode('create');
      loadRoutes();
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this route?',
    );
    if (!confirmed) return;
    try {
      await deleteRoute(id);
      loadRoutes();
    } catch (err) {
      console.log(err);
    }
  };

  const handleEdit = (route) => {
    setSelectedRoute(route);
    setMode('edit');
    setIsModalOpen(true);
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
            onClick={() => {
              setIsModalOpen(true);
              setMode('create');
              setSelectedRoute(null);
            }}
          >
            <Plus size={18} />
            Add Route
          </button>
        </div>
        <Modal
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          onSubmit={mode === 'edit' ? handleUpdateRoute : handleCreateRoute}
          initialData={selectedRoute}
          mode={mode}
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
                route={route}
                onDelete={() => handleDelete(route.id)}
                onEdit={() => handleEdit(route)}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
