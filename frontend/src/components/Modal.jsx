import { useState } from 'react';

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from '@headlessui/react';

const Modal = ({ isModalOpen, setIsModalOpen, onSubmit }) => {
  const [name, setName] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [checkTime, setCheckTime] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name,
      origin: from,
      destination: to,
      checkTime,
    };

    onSubmit(data);
  };

  return (
    <Dialog
      open={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      className='relative z-50'
    >
      <DialogBackdrop className='fixed inset-0 bg-black/60' />

      <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
        <DialogPanel className='w-full max-w-lg rounded-2xl bg-[#1e2235] p-8 shadow-xl'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6'>
            <DialogTitle className='text-xl font-bold text-white'>
              Add New Route
            </DialogTitle>
            <button
              onClick={() => setIsModalOpen(false)}
              className='text-gray-400 hover:text-white text-2xl leading-none transition-colors'
            >
              &times;
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4'>
              <div>
                <label className='block text-sm text-gray-400 mb-1'>
                  Route Name
                </label>
                <input
                  type='text'
                  placeholder='e.g. Angamaly-Kochi'
                  className='w-full rounded-lg bg-[#2a2f45] px-4 py-2 text-white outline-none focus:ring-2 focus:ring-green-400'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>

              <div>
                <label className='block text-sm text-gray-400 mb-1'>From</label>
                <input
                  type='text'
                  placeholder='Start location'
                  className='w-full rounded-lg bg-[#2a2f45] px-4 py-2 text-white outline-none focus:ring-2 focus:ring-green-400'
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>

              <div>
                <label className='block text-sm text-gray-400 mb-1'>To</label>
                <input
                  type='text'
                  placeholder='End location'
                  className='w-full rounded-lg bg-[#2a2f45] px-4 py-2 text-white outline-none focus:ring-2 focus:ring-green-400'
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>

              <div>
                <label className='block text-sm text-gray-400 mb-1'>
                  Check Time
                </label>
                <input
                  type='time'
                  className='w-full rounded-lg bg-[#2a2f45] px-4 py-2 text-white outline-none focus:ring-2 focus:ring-green-400'
                  value={checkTime}
                  onChange={(e) => setCheckTime(e.target.value)}
                />
              </div>
            </div>
            {/* Buttons */}
            <div className='flex gap-3 pt-2'>
              <button
                onClick={() => setIsModalOpen(false)}
                className='flex-1 rounded-xl border border-gray-600 py-2 text-gray-300 hover:bg-gray-700 transition-colors'
                type='button'
              >
                Cancel
              </button>
              <button
                className='flex-1 rounded-xl bg-green-400 py-2 font-bold text-black hover:bg-green-300 transition-colors'
                type='submit'
              >
                Submit
              </button>
            </div>
          </form>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
