const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    if (!uri) throw new Error('MONGO_URI is not defined in .env file');
    console.log('Connecting to MongoDB Atlas with URI:', uri.replace(/:([^:@]+)@/, ':<password>@'));
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // Timeout after 5s
      heartbeatFrequencyMS: 10000 // Check connection every 10s
    });
    console.log('MongoDB Atlas connected');
  } catch (error) {
    console.error('MongoDB Atlas connection error:', error.message);
    process.exit(1);
  }

  // Handle connection errors after initial connection
  mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err);
  });
  mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected, attempting to reconnect...');
  });
};

module.exports = connectDB;