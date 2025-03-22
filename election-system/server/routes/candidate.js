const express = require('express');
const router = express.Router();
const Student = require('../models/Student');
const PendingCandidate = require('../models/PendingCandidate');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});
const upload = multer({ storage });

router.post('/submit', upload.single('image'), async (req, res) => {
  const { name, rollNumber, email, year, stream, position, manifesto } = req.body;
  const image = req.file ? req.file.path : null;

  try {
    const student = await Student.findOne({ rollNumber });
    if (!student) return res.status(400).json({ message: 'Invalid roll number. Student not found.' });

    const pendingCandidate = new PendingCandidate({
      name,
      rollNumber,
      email,
      year,
      stream,
      position,
      manifesto,
      image
    });
    await pendingCandidate.save();
    res.json({ message: 'Candidature submitted successfully, awaiting approval' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting candidature', error: error.message });
  }
});

module.exports = router;