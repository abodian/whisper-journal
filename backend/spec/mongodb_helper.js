var mongoose = require('mongoose');

beforeAll(function (done) {
  mongoose.connect('mongodb+srv://AlexB:bodianA@cluster0.dekgoyo.mongodb.net/whisper_journal_cloud', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
  db.on('open', function () {
    done();
  });
});

afterAll(function (done) {
  mongoose.connection.close(true)
    done();
});