import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../api/auth';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNav = () => setNav(!nav);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = [
    { id: 1, text: 'Home', path: '/' },
    { id: 2, text: 'Analytics', path: '/analytics' },
    { id: 3, text: 'Settings', path: '/settings' },
  ];

  const linkClass = ({ isActive }) =>
    `p-4 rounded-xl m-2 duration-300 cursor-pointer block
     ${isActive ? 'bg-[#00df9a] text-black' : 'hover:bg-[#00df9a] hover:text-black'}`;

  const mobileLinkClass = ({ isActive }) =>
    `p-4 border-b border-slate-700 rounded-xl duration-300 cursor-pointer block
     ${isActive ? 'bg-[#00df9a] text-black' : 'hover:bg-[#00df9a] hover:text-black'}`;

  return (
    <div className='bg-slate-900 flex justify-between items-center h-24 max-w-310 mx-auto px-4 text-white'>
      <h1 className='text-3xl font-bold text-[#00df9a]'>
        Traffic Alert System.
      </h1>

      {/* Desktop Nav */}
      <ul className='hidden md:flex items-center'>
        {navItems.map((item) => (
          <NavLink to={item.path} key={item.id} className={linkClass}>
            {item.text}
          </NavLink>
        ))}
        <button
          onClick={handleLogout}
          className='p-4 rounded-xl m-2 duration-300 cursor-pointer hover:bg-red-500 hover:text-white'
        >
          Logout
        </button>
      </ul>

      <div onClick={handleNav} className='block md:hidden cursor-pointer'>
        {nav ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[60%] bg-slate-800 z-50 transform transition-transform duration-300 ease-in-out
        ${nav ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h1 className='text-2xl font-bold text-[#00df9a] p-6 border-b border-slate-700'>
          Traffic Alert.
        </h1>
        <ul className='p-4'>
          {navItems.map((item) => (
            <NavLink
              to={item.path}
              key={item.id}
              onClick={handleNav}
              className={mobileLinkClass}
            >
              {item.text}
            </NavLink>
          ))}
          <button
            onClick={() => {
              handleLogout();
              handleNav();
            }}
            className='w-full text-left p-4 border-b border-slate-700 rounded-xl duration-300 cursor-pointer hover:bg-red-500 hover:text-white'
          >
            Logout
          </button>
        </ul>
      </div>

      {nav && (
        <div
          onClick={handleNav}
          className='fixed inset-0 bg-black/50 z-40 md:hidden'
        />
      )}
    </div>
  );
};

export default Navbar;
