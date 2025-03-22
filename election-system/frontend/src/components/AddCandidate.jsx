import React, { useState } from 'react';
import axios from 'axios';

const AddCandidate = () => {
  const [studentId, setStudentId] = useState('');
  const [position, setPosition] = useState('');
  const [year, setYear] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const res = await axios.post('http://localhost:4000/api/admin/candidates', { studentId, position, year }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Candidate added successfully');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to add candidate');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-yellow-400 tracking-wide drop-shadow-[0_2px_4px_rgba(255,215,0,0.5)] text-center">
          Add Candidate
        </h2>
        {message && (
          <p className={`text-center mb-4 ${message.includes('successfully') ? 'text-yellow-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
        <input
          type="text"
          placeholder="Student ID"
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
        />
        <input
          type="text"
          placeholder="Position (e.g., Engineering CR)"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
        />
        <input
          type="number"
          placeholder="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
        />
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-yellow-400 font-semibold rounded-lg border-2 border-yellow-500/50 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Add Candidate
        </button>
      </form>
    </div>
  );
};

export default AddCandidate;