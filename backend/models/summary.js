const mongoose = require("mongoose");

const SummarySchema = new mongoose.Schema({
    _id: { type: String, required: true },
    summary: { type: String, required: true },
    date: { type: Date, required: true },
    userId: { type: String, ref: 'User', required: true }
});
  
SummarySchema.index({ userId: 1, date: 1 }, { unique: true });
  
const Summary = mongoose.model("Summary", SummarySchema, "Summary");

module.exports = Summary;
