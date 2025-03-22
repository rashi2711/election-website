require('dotenv').config();
const express = require('express');
const connectDB = require('./config/database');
const adminRoutes = require('./routes/admin');
const voteRoutes = require('./routes/vote');
const candidateRoutes = require('./routes/candidate');
const path = require('path');

const app = express();

const cors = require('cors');
app.use(cors()); // Add this after const app = express();
// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Routes
app.use('/api/admin', adminRoutes);
app.use('/api/vote', voteRoutes);
app.use('/api/candidates', candidateRoutes);

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));