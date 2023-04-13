const mongoose = require('mongoose');

const EntrySchema = new mongoose.Schema({
  title: { type: String, required: true },
  input: { type: String, required: true },
  date: { type: Date },
});

const Entry = mongoose.model('Entry', EntrySchema, 'Diary');

module.exports = Entry;