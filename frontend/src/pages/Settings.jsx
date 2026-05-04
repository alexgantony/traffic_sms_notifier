import { useState } from 'react';

const Toggle = ({ enabled, onToggle }) => (
  <button
    onClick={onToggle}
    className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
      enabled ? 'bg-[#00df9a]' : 'bg-slate-600'
    }`}
  >
    <span
      className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-200 ${
        enabled ? 'translate-x-6' : 'translate-x-0'
      }`}
    />
  </button>
);

const Settings = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(() => {
    const saved = localStorage.getItem('notificationsEnabled');
    return saved === 'true';
  });

  const [smsEnabled, setSmsEnabled] = useState(() => {
    const saved = localStorage.getItem('smsEnabled');
    return saved === 'true';
  });

  return (
    <div className='min-h-screen bg-slate-900 text-slate-100 p-4'>
      <div className='max-w-2xl mx-auto px-4'>
        <div className='py-5'>
          <h1 className='font-bold text-4xl'>Settings</h1>
        </div>

        <div className='space-y-4'>
          {/* Notifications */}
          <div className='bg-slate-800 rounded-2xl p-6'>
            <h2 className='text-[#00df9a] font-semibold text-lg mb-4'>
              Notifications
            </h2>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium text-slate-100'>Push Notifications</p>
                <p className='text-sm text-slate-400'>
                  Receive alerts for your saved routes
                </p>
              </div>
              <Toggle
                enabled={notificationsEnabled}
                onToggle={() => {
                  setNotificationsEnabled((prev) => {
                    const newValue = !prev;
                    localStorage.setItem('notificationsEnabled', newValue);
                    return newValue;
                  });
                }}
              />
            </div>
          </div>

          {/* SMS */}
          <div className='bg-slate-800 rounded-2xl p-6'>
            <h2 className='text-[#00df9a] font-semibold text-lg mb-4'>SMS</h2>
            <div className='flex items-center justify-between'>
              <div>
                <p className='font-medium text-slate-100'>SMS Alerts</p>
                <p className='text-sm text-slate-400'>
                  Get traffic updates via text message
                </p>
              </div>
              <Toggle
                enabled={smsEnabled}
                onToggle={() => {
                  setSmsEnabled((prev) => {
                    const newValue = !prev;
                    localStorage.setItem('smsEnabled', newValue);
                    return newValue;
                  });
                }}
              />
            </div>
          </div>

          {/* About */}
          <div className='bg-slate-800 rounded-2xl p-6'>
            <h2 className='text-[#00df9a] font-semibold text-lg mb-4'>About</h2>
            <div className='space-y-3 text-sm text-slate-400'>
              <div className='flex justify-between'>
                <span>App Name</span>
                <span className='text-slate-100'>Traffic Alert System</span>
              </div>
              <div className='flex justify-between'>
                <span>Version</span>
                <span className='text-slate-100'>1.0.0</span>
              </div>
              <div className='flex justify-between'>
                <span>Developer</span>
                <span className='text-slate-100'>Alex Antony</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
