import { Pencil, Trash2 } from 'lucide-react';
import { useState } from 'react';

const RouteCard = ({ route, onDelete, onEdit }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`p-4 rounded-2xl border border-slate-700 shadow-sm cursor-pointer duration-300 mb-6 active:scale-95 transition-all
        ${hovered ? 'bg-slate-700' : 'bg-slate-800'}`}
    >
      <div className='space-y-1 mb-2'>
        <h2 className='text-lg text-[#00df9a] font-semibold'>{route.name}</h2>
        <h2 className='text-lg font-medium'>
          {route.origin} → {route.destination}
        </h2>
        <p className='text-slate-400 text-sm'>Check Time - {route.checkTime}</p>
      </div>
      <div className='flex justify-end gap-2'>
        <button
          onClick={(e) => e.stopPropagation()}
          onMouseEnter={() => setHovered(false)}
          onMouseLeave={() => setHovered(true)}
          className='text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 p-2 rounded-lg transition-colors duration-200'
          onClick={(e) => {
            e.stopPropagation();
            onEdit(route);
          }}
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
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

export default RouteCard;
