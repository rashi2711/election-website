import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/admin/login', credentials);
      localStorage.setItem('adminToken', response.data.token);
      navigate('/admin-dashboard');
    } catch (error) {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 p-10  mx-auto flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-4xl font-bold mb-8 text-yellow-400 tracking-wide drop-shadow-[0_2px_2px_rgba(255,215,0,0.5)] text-center">
          Admin Login
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-xl">
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">Username</label>
            <input
              type="text"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
              placeholder="Enter username"
            />
          </div>
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
              placeholder="Enter password"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gray-800 text-yellow-400 font-semibold rounded-lg border-2 border-yellow-500/50 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;