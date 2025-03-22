// client/src/components/AdminCandidatureReview.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminCandidatureReview = () => {
  const [candidates, setCandidates] = useState([]);
  const [token] = useState(localStorage.getItem('adminToken')); // Assuming token stored after login

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/admin/pending-candidates', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setCandidates(response.data);
      } catch (error) {
        console.error('Error fetching candidates:', error);
      }
    };
    fetchCandidates();
  }, [token]);

  const handleAction = async (pendingId, status) => {
    try {
      const response = await axios.post('http://localhost:5000/api/admin/approve-candidate', 
        { pendingId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(response.data.message);
      setCandidates(candidates.filter(c => c._id !== pendingId));
    } catch (error) {
      alert('Failed to process candidature');
    }
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-5 text-gray-800">Review Candidate Applications</h1>
      {candidates.length === 0 ? (
        <p>No pending candidatures</p>
      ) : (
        candidates.map(candidate => (
          <div key={candidate._id} className="mb-6 bg-white shadow-md rounded-lg p-6">
            <p><strong>Name:</strong> {candidate.name}</p>
            <p><strong>Roll Number:</strong> {candidate.rollNumber}</p>
            <p><strong>Email:</strong> {candidate.email}</p>
            <p><strong>Year:</strong> {candidate.year}</p>
            <p><strong>Stream:</strong> {candidate.stream}</p>
            <p><strong>Position:</strong> {candidate.position}</p>
            <p><strong>Manifesto:</strong> {candidate.manifesto}</p>
            {candidate.image && <img src={`http://localhost:5000/${candidate.image}`} alt="Candidate" className="w-32 h-32 mt-2" />}
            <div className="mt-4 space-x-4">
              <button
                onClick={() => handleAction(candidate._id, 'approved')}
                className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
              >
                Approve
              </button>
              <button
                onClick={() => handleAction(candidate._id, 'rejected')}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default AdminCandidatureReview;