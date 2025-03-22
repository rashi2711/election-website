const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const Student = require('../models/Student');
const Candidate = require('../models/Candidate');
const bcrypt = require('bcrypt'); // Add this for password hashing

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const authVoter = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ message: 'No token provided' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.studentId = decoded.studentId;
    next();
  } catch (err) {
    console.error('Token verification failed:', err.message);
    res.status(401).json({ message: 'Invalid or expired token' });
  }
};

// Voter Login with Email and Password
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'Email and password are required' });
  
  try {
    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: 'Invalid email' });
    if (!student.password || !(await bcrypt.compare(password, student.password))) {
      return res.status(400).json({ message: 'Invalid password' });
    }
    if (student.hasVoted) return res.status(400).json({ message: 'You have already voted' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    student.otp = otp;
    await student.save();

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: student.email,
      subject: 'Your Voting OTP',
      text: `Your OTP for voting is: ${otp}. It expires in 10 minutes.`,
    };
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${student.email}: ${otp}`);

    res.json({ message: 'OTP sent to your email', studentId: student._id });
  } catch (error) {
    console.error('Voter login error:', error.message);
    res.status(500).json({ message: 'Server error during login' });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { studentId, otp } = req.body;
  if (!studentId || !otp) return res.status(400).json({ message: 'Student ID and OTP are required' });
  try {
    const student = await Student.findById(studentId);
    if (!student) return res.status(400).json({ message: 'Invalid student ID' });
    if (student.hasVoted) return res.status(400).json({ message: 'Student has already voted' });
    if (student.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' });

    student.otp = null;
    await student.save();
    const token = jwt.sign({ studentId: student._id }, process.env.JWT_SECRET, { expiresIn: '10m' });
    res.json({ message: 'OTP verified', token });
  } catch (error) {
    console.error('Verify OTP error:', error.message);
    res.status(500).json({ message: 'Server error during OTP verification' });
  }
});

router.post('/cast-vote', authVoter, async (req, res) => {
  const { candidateId } = req.body;
  if (!candidateId) return res.status(400).json({ message: 'Candidate ID is required' });
  try {
    const student = await Student.findById(req.studentId);
    if (!student) return res.status(400).json({ message: 'Invalid student ID' });
    if (student.hasVoted) return res.status(400).json({ message: 'Student has already voted' });

    const candidate = await Candidate.findById(candidateId);
    if (!candidate) return res.status(400).json({ message: 'Invalid candidate ID' });

    candidate.votes += 1;
    student.hasVoted = true;
    await Promise.all([candidate.save(), student.save()]);
    res.json({ message: 'Vote cast successfully' });
  } catch (error) {
    console.error('Cast vote error:', error.message);
    res.status(500).json({ message: 'Server error during vote casting' });
  }
});

router.get('/candidates', async (req, res) => {
  try {
    const candidates = await Candidate.find().populate('studentId', 'name rollNumber');
    const candidateData = candidates.map(c => ({
      _id: c._id,
      name: c.studentId?.name || 'Unknown',
      position: c.position
    }));
    res.json(candidateData);
  } catch (error) {
    console.error('Fetch candidates error:', error.message);
    res.status(500).json({ message: 'Server error fetching candidates' });
  }
});

module.exports = router;