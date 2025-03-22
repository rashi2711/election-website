import React, { useState, useEffect } from 'react';
import axios from 'axios';

const VotingProgress = () => {
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const token = localStorage.getItem('adminToken');
        const res = await axios.get('http://localhost:4000/api/admin/voting-progress', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProgress(res.data);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch progress');
      }
    };
    fetchProgress();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex justify-center items-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-xl w-96">
        <h2 className="text-3xl font-bold mb-6 text-yellow-400 tracking-wide drop-shadow-[0_2px_4px_rgba(255,215,0,0.5)] text-center">
          Voting Progress
        </h2>
        {error && <p className="text-red-400 mb-4 text-center">{error}</p>}
        {progress ? (
          <div className="text-gray-300">
            <p><span className="text-yellow-400 font-semibold">Total Students:</span> {progress.totalStudents}</p>
            <p><span className="text-yellow-400 font-semibold">Voted Students:</span> {progress.votedStudents}</p>
            <h3 className="mt-4 text-yellow-400 font-semibold">Candidates:</h3>
            {progress.candidates.map((candidate, index) => (
              <p key={index} className="text-gray-300">
                <span className="text-yellow-400">{candidate.name}</span> ({candidate.position}): {candidate.votes} votes
              </p>
            ))}
          </div>
        ) : (
          <p className="text-gray-300 text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default VotingProgress;