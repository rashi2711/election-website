const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  rollNumber: { type: String, unique: true },
  email: { type: String, unique: true },
  password: { type: String, required: true }, // Add this
  gender: String,
  year: Number,
  stream: String,
  passkey: { type: String, unique: true }, // Optional if you keep it
  hasVoted: { type: Boolean, default: false },
  otp: String
});

module.exports = mongoose.model('Student', studentSchema);