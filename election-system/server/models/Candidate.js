// server/models/Candidate.js
const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
  position: String,
  year: Number,
  votes: { type: Number, default: 0 }
});

module.exports = mongoose.model('Candidate', candidateSchema);