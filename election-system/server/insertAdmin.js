// server/insertAdmin.js
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Admin = require('./models/Admin');

const insertAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000,
      heartbeatFrequencyMS: 10000
    });
    console.log('Connected to MongoDB Atlas');

    const username = 'admin';
    const password = 'admin123';
    const hashedPassword = bcrypt.hashSync(password, 10);

    const adminExists = await Admin.findOne({ username });
    if (!adminExists) {
      const admin = new Admin({
        username: username,
        password: hashedPassword,
        logs: []
      });
      await admin.save();
      console.log(`Admin created: ${username} with password 'admin123'`);
    } else {
      console.log(`Admin '${username}' already exists, updating password`);
      await Admin.updateOne({ username }, { password: hashedPassword });
    }

    console.log('Admin setup complete. Hashed password:', hashedPassword);
    mongoose.connection.close();
  } catch (error) {
    console.error('Error inserting admin:', error.message);
    process.exit(1);
  }
};

insertAdmin();