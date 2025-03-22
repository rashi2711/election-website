import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('adminToken');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.get('http://localhost:5000/api/admin/voting-progress', {
          headers: { Authorization: `Bearer ${token}` }
        });
        // If successful, do nothing (or fetch data to display)
      } catch (error) {
        console.error('Dashboard error:', error.response?.data || error.message);
        navigate('/admin-login'); // Redirect if unauthorized
      }
    };
    if (!token) navigate('/admin-login');
    else checkAuth();
  }, [token, navigate]);

  return (
    <div className="min-h-screen bg-gray-900 p-10  mx-auto">
      <h1 className="text-4xl font-bold mb-8 text-yellow-400 tracking-wide drop-shadow-[0_2px_2px_rgba(255,215,0,0.5)]">
        Admin Dashboard
      </h1>
      <div className="space-y-6">
        <button
          onClick={() => navigate('/review-candidates')}
          className="w-full px-6 py-3 bg-gray-800 text-yellow-400 font-semibold rounded-lg border-2 border-yellow-500/50 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Review Candidates
        </button>
        <button
          onClick={() => navigate('/voting-progress')}
          className="w-full px-6 py-3 bg-gray-800 text-yellow-400 font-semibold rounded-lg border-2 border-yellow-500/50 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          View Voting Progress
        </button>
      </div>
    </div>
  );
};

export default AdminDashboard;