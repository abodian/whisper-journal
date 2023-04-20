const mongoose = require("mongoose");

const TranscriptionSchema = new mongoose.Schema({
  entryId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: "Transcription",
  },
  result: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

const Transcription = mongoose.model(
  "Transcription",
  TranscriptionSchema,
  "Transcription"
);

module.exports = Transcription;
