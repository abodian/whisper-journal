const mongoose = require("mongoose");

const EntrySchema = new mongoose.Schema({
  _id: { type: String, required: true},
  title: { type: String, required: true },
  diaryEntry: { type: String, required: true },
  date: { type: Date },
  userId: { type: String, ref: 'User' } // add user reference
});

EntrySchema.index({ userId: 1, date: 1 }, { unique: true }); //before adding an entry it will check first that there is another entry with the same user id and date

const Entry = mongoose.model("Entry", EntrySchema, "Diary");

module.exports = Entry;
