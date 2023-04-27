const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  diaryEntry: { type: String, required: true },
  date: { type: Date },
  userId: { type: String, ref: 'User' } // add user reference
});

const Entry = mongoose.model("Entry", EntrySchema, "Diary");

module.exports = Entry;
