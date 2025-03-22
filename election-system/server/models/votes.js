const mongoose = require('mongoose');

const votesSchema = new mongoose.Schema({
studentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Student' },
candidateId:{ type: mongoose.Schema.Types.ObjectId, ref: 'Candidate' },
position:String,
timestamp:Date.now()
});

module.exports = mongoose.model('votes', votesSchema);