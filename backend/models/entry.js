const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  diaryEntry: { type: String, required: true },
  date: { type: Date },
  userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
});

const Entry = mongoose.model("Entry", EntrySchema, "Diary");

module.exports = Entry;
