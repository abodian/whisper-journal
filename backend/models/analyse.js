const mongoose = require('mongoose');
const User = require('./user')

const AnalysisSchema = new mongoose.Schema({
  result: { type: String, required: true },
  date: { type: Date, default: Date.now },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Analysis = mongoose.model('Analysis', AnalysisSchema, 'Analysis');

module.exports = Analysis;
