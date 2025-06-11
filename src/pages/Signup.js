import React, { useState } from 'react';
import { FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { Link, useNavigate } from 'react-router-dom';
import { register, saveToken } from '../services/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await register(formData);
      saveToken(res.data.token); // Save JWT to localStorage
      navigate('/login'); // Or any protected route
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-3xl font-semibold text-center text-white mb-6">Sign Up</h2>

        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="flex items-center border border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white">
            <FiUser className="mr-2" />
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="bg-transparent outline-none w-full placeholder-gray-400"
              required
            />
          </div>

          <div className="flex items-center border border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white">
            <FiMail className="mr-2" />
            <input
              type="email"
              name="email"
              placeholder="Email address"
              value={formData.email}
              onChange={handleChange}
              className="bg-transparent outline-none w-full placeholder-gray-400"
              required
            />
          </div>

          <div className="flex items-center border border-gray-700 rounded-md px-3 py-2 bg-gray-900 text-white">
            <FiLock className="mr-2" />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="bg-transparent outline-none w-full placeholder-gray-400"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gray-700 hover:bg-gray-600 text-white font-semibold py-2 rounded-md transition"
          >
            Sign Up
          </button>
        </form>

        {/* Google Sign Up Button (placeholder) */}
        <div className="mt-4">
          <button
            type="button"
            className="w-full flex items-center justify-center bg-white text-gray-800 font-semibold py-2 rounded-md hover:bg-gray-100 transition"
            disabled
          >
            <FcGoogle className="text-xl mr-2" />
            Sign Up with Google (Coming soon)
          </button>
        </div>

        <div className="text-center mt-4">
          <Link to="/forgot-password">
            <p className="text-gray-400 text-sm hover:underline cursor-pointer">Forgot password?</p>
          </Link>
          <p className="text-gray-400 text-sm mt-2">
            Already have an account?{' '}
            <Link to="/login">
              <span className="text-white font-semibold hover:underline cursor-pointer">
                Sign in
              </span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
