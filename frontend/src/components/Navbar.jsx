import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  const handleNav = () => setNav(!nav);

  const navItems = [
    { id: 1, text: 'Home' },
    { id: 2, text: 'Analytics' },
    { id: 3, text: 'Settings' },
  ];

  return (
    <div className='bg-slate-900 flex justify-between items-center h-24 max-w-310 mx-auto px-4 text-white'>
      {/* Logo */}
      <h1 className='text-3xl font-bold text-[#00df9a]'>
        Traffic Alert System.
      </h1>

      {/* Desktop Nav */}
      <ul className='hidden md:flex'>
        {navItems.map((item) => (
          <li
            key={item.id}
            className='p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 hover:text-black'
          >
            {item.text}
          </li>
        ))}
      </ul>

      {/* Hamburger icon — mobile only */}
      <div onClick={handleNav} className='block md:hidden cursor-pointer'>
        {nav ? <X size={28} /> : <Menu size={28} />}
      </div>

      {/* Mobile Side Drawer */}
      <div
        className={`fixed top-0 left-0 h-full w-[60%] bg-slate-800 z-50 transform transition-transform duration-300 ease-in-out
          ${nav ? 'translate-x-0' : '-translate-x-full'}`}
      >
        <h1 className='text-2xl font-bold text-[#00df9a] p-6 border-b border-slate-700'>
          Traffic Alert.
        </h1>
        <ul className='p-4'>
          {navItems.map((item) => (
            <li
              key={item.id}
              onClick={handleNav}
              className='p-4 border-b border-slate-700 hover:bg-[#00df9a] hover:text-black rounded-xl cursor-pointer duration-300'
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>

      {/* Backdrop overlay */}
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
