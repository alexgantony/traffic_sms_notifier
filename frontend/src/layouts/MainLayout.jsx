import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainLayout = () => {
  return (
    <div className='min-h-screen bg-slate-900'>
      <Navbar />
      <Outlet /> {/* pages render here */}
    </div>
  );
};

export default MainLayout;
