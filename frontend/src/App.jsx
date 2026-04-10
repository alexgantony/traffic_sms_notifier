import { Route, Routes } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Analytics from './pages/Analytics';
import Home from './pages/Home';
import Login from './pages/Login';
import Settings from './pages/Settings';

function App() {
  return (
    <Routes>
      <Route path='/login' element={<Login />} />
      <Route element={<MainLayout />}>
        <Route path='/' element={<Home />} />
        <Route path='/analytics' element={<Analytics />} />
        <Route path='/settings' element={<Settings />} />
      </Route>
    </Routes>
  );
}

export default App;
