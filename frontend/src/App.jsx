import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Analytics from './pages/Analytics';
import Home from './pages/Home';
import Settings from './pages/Settings';

const App = () => {
  return (
    <>
      <div className='min-h-screen bg-slate-900'>
        <Navbar />
        {/* <div>
          <Home />
        </div> */}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/analytics' element={<Analytics />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </div>
    </>
  );
};

export default App;
