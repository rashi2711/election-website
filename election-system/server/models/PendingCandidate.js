// server/models/PendingCandidate.js
const mongoose = require('mongoose');

const pendingCandidateSchema = new mongoose.Schema({
  name: String,
  rollNumber: { type: String, required: true },
  email: String,
  year: Number,
  stream: String,
  position: String,
  manifesto: String,
  image: String, // Store image path or URL
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  submittedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('PendingCandidate', pendingCandidateSchema);