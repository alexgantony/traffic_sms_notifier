import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Analytics from './pages/Analytics';
import Home from './pages/Home';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
