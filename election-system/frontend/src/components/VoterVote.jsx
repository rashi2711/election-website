import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const VoterVote = () => {
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState('');
  const [error, setError] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const { studentId } = location.state || {};

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/vote/candidates');
        setCandidates(response.data);
      } catch (err) {
        setError('Failed to fetch candidates');
      }
    };
    if (!studentId) navigate('/voter-login');
    else fetchCandidates();
  }, [studentId, navigate]);

  const handleVote = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/vote/cast-vote', { studentId, candidateId: selectedCandidate });
      alert('Vote cast successfully');
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to cast vote');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black p-10 max-w-md mx-auto flex items-center justify-center">
      <div className="w-full">
        <h1 className="text-4xl font-bold mb-8 text-center text-yellow-400 tracking-wide drop-shadow-[0_2px_4px_rgba(255,215,0,0.5)]">
          Cast Your Vote
        </h1>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        <form onSubmit={handleVote} className="space-y-6 bg-gray-800 p-6 rounded-lg shadow-xl">
          <div>
            <label className="block text-yellow-400 font-semibold mb-2">Select Candidate</label>
            <select
              value={selectedCandidate}
              onChange={(e) => setSelectedCandidate(e.target.value)}
              className="w-full px-4 py-2 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:border-yellow-500 transition-all duration-200"
              required
            >
              <option value="" className="text-gray-400">-- Choose a candidate --</option>
              {candidates.map(candidate => (
                <option key={candidate._id} value={candidate._id} className="text-white">
                  {candidate.name} ({candidate.position})
                </option>
              ))}
            </select>
          </div>
          <button
            type="submit"
            className="w-full px-6 py-3 bg-gradient-to-r from-gray-700 to-gray-600 text-yellow-400 font-semibold rounded-lg border-2 border-yellow-500/50 hover:bg-yellow-500 hover:text-gray-900 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            Cast Vote
          </button>
        </form>
      </div>
    </div>
  );
};

export default VoterVote;