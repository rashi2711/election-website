import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const VoterLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [studentId, setStudentId] = useState(null);
  const [step, setStep] = useState('login'); // 'login' or 'otp'
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/vote/login', { email, password });
      setStudentId(response.data.studentId);
      setStep('otp');
      setError('');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:4000/api/vote/verify-otp', { studentId, otp });
      navigate('/voter-vote', { state: { studentId: response.data.studentId } });
    } catch (err) {
      setError(err.response?.data?.message || 'OTP verification failed');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 mx-auto flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400 tracking-wide drop-shadow-[0_2px_4px_rgba(255,215,0,0.5)]">
          Voter Login
        </h1>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        
        {step === 'login' ? (
          <form onSubmit={handleLoginSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-xl">
            <div>
              <label className="block text-yellow-400 font-semibold mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
              <label className="block text-yellow-400 font-semibold mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
                placeholder="Enter your password"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-yellow-400 font-semibold rounded-lg border-2 border-yellow-500/50 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Login
            </button>
          </form>
        ) : (
          <form onSubmit={handleOtpSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-xl">
            <div>
              <label className="block text-yellow-400 font-semibold mb-2">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
                placeholder="Enter your OTP"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-yellow-400 font-semibold rounded-lg border-2 border-yellow-500/50 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              Verify OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default VoterLogin;