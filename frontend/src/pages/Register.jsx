import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { register } from '../api/auth';

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const [isLoading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setErrorMsg('Password does not match');
      return;
    }

    try {
      setLoading(true);
      const res = await register(username, password, email, phoneNumber);

      if (res) {
        navigate('/login');
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setErrorMsg('Username or email already exists');
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
          <p className='text-slate-400 text-sm mt-1'>Create your account</p>
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
              placeholder='Choose a username'
              className='w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-[#00df9a] transition-colors duration-200'
            />
          </div>

          {/* Full name */}
          <div className='mb-5'>
            <label className='block text-slate-400 text-sm font-medium mb-2'>
              Full name
            </label>
            <input
              type='text'
              name='fullName'
              id='fullName'
              value={fullName}
              onChange={(e) => {
                setErrorMsg('');
                setFullName(e.target.value);
              }}
              placeholder='Enter your full name'
              className='w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-[#00df9a] transition-colors duration-200'
            />
          </div>

          {/* Email */}
          <div className='mb-5'>
            <label className='block text-slate-400 text-sm font-medium mb-2'>
              Email
            </label>
            <input
              type='email'
              name='email'
              id='email'
              value={email}
              onChange={(e) => {
                setErrorMsg('');
                setEmail(e.target.value);
              }}
              placeholder='Enter your email'
              className='w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-[#00df9a] transition-colors duration-200'
            />
          </div>

          {/* Phone number */}
          <div className='mb-5'>
            <label className='block text-slate-400 text-sm font-medium mb-2'>
              Phone number
            </label>
            <input
              type='tel'
              placeholder='+91 98765 43210'
              name='phoneNumber'
              id='phoneNumber'
              value={phoneNumber}
              onChange={(e) => {
                setErrorMsg('');
                setPhoneNumber(e.target.value);
              }}
              className='w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-[#00df9a] transition-colors duration-200'
            />
          </div>

          {/* Password */}
          <div className='mb-5'>
            <label className='block text-slate-400 text-sm font-medium mb-2'>
              Password
            </label>
            <div className='relative'>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder='Create a password'
                name='password'
                id='password'
                value={password}
                onChange={(e) => {
                  setErrorMsg('');
                  setPassword(e.target.value);
                }}
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

          {/* Confirm password */}
          <div className='mb-6'>
            <label className='block text-slate-400 text-sm font-medium mb-2'>
              Confirm password
            </label>
            <div className='relative'>
              <input
                type={showConfirm ? 'text' : 'password'}
                placeholder='Repeat your password'
                name='confirmPassword'
                id='confirmPassword'
                value={confirmPassword}
                onChange={(e) => {
                  setErrorMsg('');
                  setConfirmPassword(e.target.value);
                }}
                className='w-full bg-slate-900 border border-slate-700 rounded-xl px-4 py-3 pr-11 text-sm text-slate-100 placeholder-slate-600 outline-none focus:border-[#00df9a] transition-colors duration-200'
              />
              <button
                type='button'
                onClick={() => setShowConfirm(!showConfirm)}
                className='absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors duration-200'
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {/* Error message */}
          {errorMsg && (
            <p className='text-red-400 text-sm text-center mb-4'>{errorMsg}</p>
          )}

          {/* Submit */}
          <button
            className='w-full flex items-center justify-center bg-[#00df9a] hover:bg-[#00c589] text-black font-semibold py-3 rounded-xl cursor-pointer duration-200 active:scale-95 transition-all text-sm'
            value='register'
            disabled={isLoading}
            onClick={handleRegister}
          >
            {isLoading ? 'Signing up...' : 'Create account'}
          </button>

          {/* Login link */}
          <p className='text-center text-slate-400 text-sm mt-5'>
            Already have an account?{' '}
            <Link
              to='/login'
              className='text-[#00df9a] font-medium hover:underline'
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
