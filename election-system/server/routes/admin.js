const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');
const Student = require('../models/Student');
const Candidate = require('../models/Candidate');
const PendingCandidate = require('../models/PendingCandidate');

const auth = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Admin Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }
  const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  await Admin.updateOne({ _id: admin._id }, { $push: { logs: { action: 'Logged in', timestamp: new Date() } } });
  res.json({ token });
});

// Get All Pending Candidates
router.get('/pending-candidates', auth, async (req, res) => {
  try {
    const pendingCandidates = await PendingCandidate.find({ status: 'pending' });
    res.json(pendingCandidates);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching pending candidates', error: error.message });
  }
});

// Approve or Reject Candidate
router.post('/approve-candidate', auth, async (req, res) => {
  const { pendingId, status } = req.body; // status: 'approved' or 'rejected'
  try {
    const pendingCandidate = await PendingCandidate.findById(pendingId);
    if (!pendingCandidate) return res.status(404).json({ message: 'Pending candidate not found' });

    pendingCandidate.status = status;
    await pendingCandidate.save();

    if (status === 'approved') {
      const student = await Student.findOne({ rollNumber: pendingCandidate.rollNumber });
      if (!student) return res.status(400).json({ message: 'Student not found in database' });

      const candidate = new Candidate({
        studentId: student._id,
        position: pendingCandidate.position,
        year: pendingCandidate.year
      });
      await candidate.save();
    }

    await Admin.updateOne({ _id: req.admin.id }, { $push: { logs: { action: `Candidate ${status} for ${pendingCandidate.position}`, timestamp: new Date() } } });
    res.json({ message: `Candidate ${status} successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Error processing approval', error: error.message });
  }
});

// Voting Progress
router.get('/voting-progress', auth, async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const votedStudents = await Student.countDocuments({ hasVoted: true });
    const candidates = await Candidate.find().populate('studentId', 'name rollNumber');
    const candidateData = candidates.map(candidate => ({
      name: candidate.studentId ? candidate.studentId.name : 'Unknown',
      rollNumber: candidate.studentId ? candidate.studentId.rollNumber : 'N/A',
      position: candidate.position,
      votes: candidate.votes
    }));
    res.json({ totalStudents, votedStudents, candidates: candidateData });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching voting progress', error: error.message });
  }
});

module.exports = router;