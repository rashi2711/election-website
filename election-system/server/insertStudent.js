// server/insertStudent.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Student = require('./models/Student');
require('dotenv').config();

const updateStudents = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const students = [
    { email: 'test@example.com', password: 'voter123' },
  ];
  for (const s of students) {
    const hashedPassword = bcrypt.hashSync(s.password, 10);
    await Student.updateOne(
      { email: s.email },
      { $set: { password: hashedPassword } },
      { upsert: true }
    );
    console.log(`Updated/Added student: ${s.email}`);
  }
  mongoose.connection.close();
};
updateStudents();