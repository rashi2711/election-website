const mongoose = require('mongoose');

const positionsSchema = new mongoose.Schema({
  
  position: String,
 maxWinners:Number
});

module.exports = mongoose.model('positions', positionsSchema);