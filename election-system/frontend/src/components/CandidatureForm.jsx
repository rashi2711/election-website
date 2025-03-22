import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CandidatureForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    rollNumber: '',
    email: '',
    year: '',
    stream: '',
    position: '',
    manifesto: '',
    image: null
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    try {
      const response = await axios.post('http://localhost:5000/api/candidates/submit', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert(response.data.message);
      navigate('/');
    } catch (error) {
      alert('Failed to submit candidature');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 mx-auto flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400 tracking-wide drop-shadow-[0_2px_4px_rgba(255,215,0,0.5)]">
          Candidate Application Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-xl">
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
              placeholder="Enter your name"
            />
          </div>
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
              placeholder="Enter your roll number"
            />
          </div>
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">Year</label>
            <input
              type="number"
              name="year"
              value={formData.year}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
              placeholder="Enter your year"
            />
          </div>
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">Stream</label>
            <input
              type="text"
              name="stream"
              value={formData.stream}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
              placeholder="Enter your stream"
            />
          </div>
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">Position</label>
            <input
              type="text"
              name="position"
              value={formData.position}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
              placeholder="Enter position applying for"
            />
          </div>
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">Manifesto</label>
            <textarea
              name="manifesto"
              value={formData.manifesto}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
              placeholder="Write your manifesto"
              rows="4"
            />
          </div>
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">Upload Image</label>
            <input
              type="file"
              onChange={handleFileChange}
              required
              className="w-full px-4 py-2 bg-gray-700 text-gray-300 border border-gray-600 rounded-lg file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-yellow-400 file:bg-gray-600 hover:file:bg-yellow-500 hover:file:text-gray-900 transition-all duration-200"
            />
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-yellow-400 font-semibold rounded-lg border-2 border-yellow-500/50 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Submit Candidature
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidatureForm;