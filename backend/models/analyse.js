const mongoose = require('mongoose');

const AnalysisSchema = new mongoose.Schema({
  entryId: { type: mongoose.Schema.Types.ObjectId, required: false, ref: 'Entry' },
  result: { type: String, required: true },
  date: { type: Date, default: Date.now }
});

const Analysis = mongoose.model('Analysis', AnalysisSchema, 'Analysis');

module.exports = Analysis;
