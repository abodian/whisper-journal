const mongoose = require('mongoose');

const uri = 'mongodb+srv://MichalS:misiek3500@cluster0.dekgoyo.mongodb.net/whisper_journal_cloud';
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(err));

module.exports = mongoose.connection;
