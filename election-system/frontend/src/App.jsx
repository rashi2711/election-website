import React from 'react';
import { Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import AdminCandidatureReview from './components/AdminCandidatureReview'; // Replace UploadStudents
import CandidatureForm from './components/CandidatureForm';
import VotingProgress from './components/VotingProgress';
import VoterLogin from './components/VoterLogin';
import VoterVote from './components/VoterVote';
import ElectionRules from './components/ElectionRules';

function App() {
  return (
    <div className="min-h-screen bg-gray-100">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/review-candidates" element={<AdminCandidatureReview />} /> {/* Updated */}
        <Route path="/add-candidate" element={<CandidatureForm />} />
        <Route path="/voting-progress" element={<VotingProgress />} />
        <Route path="/voter-login" element={<VoterLogin />} />
        <Route path="/voter-vote" element={<VoterVote />} />
        <Route path="/rules" element={<ElectionRules />} />
      </Routes>
    </div>
  );
}

export default App;