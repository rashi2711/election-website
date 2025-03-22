import React, { useState } from 'react';
import axios from 'axios';

const UploadStudents = () => {
  const [students, setStudents] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const studentData = JSON.parse(students); // Expecting JSON input
      const res = await axios.post('http://localhost:4000/api/admin/upload-students', studentData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMessage('Students uploaded successfully');
      console.log(res.data); // Passkeys are here
    } catch (err) {
      setMessage(err.response?.data?.message || 'Upload failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex justify-center items-center">
      <form onSubmit={handleSubmit} className="bg-gray-800 p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-yellow-400 tracking-wide drop-shadow-[0_2px_4px_rgba(255,215,0,0.5)] text-center">
          Upload Students
        </h2>
        {message && (
          <p className={`text-center mb-4 ${message.includes('successfully') ? 'text-yellow-400' : 'text-red-400'}`}>
            {message}
          </p>
        )}
        <textarea
          placeholder='[{"name": "John Doe", "rollNumber": "JD001", "email": "test@example.com", "gender": "M", "year": 1, "stream": "Engineering"}]'
          value={students}
          onChange={(e) => setStudents(e.target.value)}
          className="w-full p-3 mb-4 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200 h-40 resize-none"
        />
        <button
          type="submit"
          className="w-full px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-yellow-400 font-semibold rounded-lg border-2 border-yellow-500/50 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
        >
          Upload
        </button>
      </form>
    </div>
  );
};

export default UploadStudents;