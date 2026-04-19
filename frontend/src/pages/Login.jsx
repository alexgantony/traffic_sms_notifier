import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../api/auth';

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [isLoading, setLoading] = useState(false);

  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const trimmedUsername = username.trim();
    const trimmedPassword = password.trim();

    if (!trimmedUsername || !trimmedPassword) {
      setErrorMsg('Username and password are required');
      return;
    }

    try {
      setLoading(true);
      const res = await login(trimmedUsername, trimmedPassword, rememberMe);

      if (res) {
        navigate('/');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        setErrorMsg('Invalid username or password');
      } else if (error.response?.status === 500) {
        setErrorMsg('Server error, please try again');
      } else if (error.request) {
        setErrorMsg('Network error, check connection');
      } else {
        setErrorMsg('Something went wrong. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className='min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 p-4'>
      <div className='w-full max-w-md'>
        {/* Brand header */}
        <div className='text-center mb-8'>
          <h1 className='text-[#00df9a] text-2xl font-bold'>
            Traffic Alert System.
          </h1>
          <p className='text-slate-400 text-sm mt-1'>Sign in to your account</p>
        </div>

        {/* Card */}
        <div className='bg-slate-800 border border-slate-700 rounded-2xl p-8'>
          {/* Username */}
          <div className='mb-5'>
            <label className='block text-slate-400 text-sm font-medium mb-2'>
              Username
            </label>
            <input
              type='text'
              name='username'
              id='username'
              value={username}
              onChange={(e) => {
                setErrorMsg('');
                setUsername(e.target.value);
              }}
              placeholder='Enter your username'
              className='w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-[#00df9a] transition-colors duration-200'
            />
          </div>

          {/* Password */}
          <div className='mb-4'>
            <div className='flex justify-between items-center mb-2'>
              <label className='text-slate-400 text-sm font-medium'>
                Password
              </label>
              <a href='#' className='text-[#00df9a] text-xs hover:underline'>
                Forgot password?
              </a>
            </div>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                name='password'
                id='password'
                value={password}
                onChange={(e) => {
                  setErrorMsg('');
                  setPassword(e.target.value);
                }}
                placeholder='Enter your password'
                className='w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 pr-11 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-[#00df9a] transition-colors duration-200'
              />
              <button
                type='button'
                onClick={() => setShowPassword(!showPassword)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors duration-200'
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className='flex items-center gap-2 mb-6'>
            <input
              type='checkbox'
              id='remember'
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className='w-4 h-4 accent-[#00df9a] cursor-pointer'
            />
            <label
              htmlFor='remember'
              className='text-slate-400 text-sm cursor-pointer'
            >
              Remember me
            </label>
          </div>

          {/* Error message */}
          {errorMsg && (
            <p className='text-red-400 text-sm text-center mb-4'>{errorMsg}</p>
          )}

          {/* Login button */}
          <button
            className='w-full flex items-center justify-center bg-[#00df9a] hover:bg-[#00c589] text-black font-semibold py-3 rounded-xl cursor-pointer duration-200 active:scale-95 transition-all text-sm'
            value='login'
            disabled={isLoading}
            onClick={handleLogin}
          >
            {isLoading ? 'Signing in...' : 'Sign in'}
          </button>

          {/* Register */}
          <p className='text-center text-slate-400 text-sm mt-5'>
            Don't have an account?{' '}
            <Link
              to='/register'
              className='text-[#00df9a] font-medium hover:underline'
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
