const express = require("express");
const server = express();
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const EntryController = require("./controllers/entry");
const AnalysisController = require("./controllers/analyse");
const TranscribeController = require("./controllers/transcribe");
const UsersController = require("./controllers/user");
const cors = require("cors");
server.use(cors());
require("dotenv").config();
const { MONGO_URL } = process.env;

const whisperJournalSDK = require("./whisper-journal-4ef93-firebase-adminsdk-xjbi8-f4a173182a");
const SummaryController = require("./controllers/summary");

// Use the configuration values
whisperJournalSDK.private_key_id = process.env.PRIVATE_KEY_ID;
whisperJournalSDK.private_key = process.env.PRIVATE_KEY;

// Use the service account credentials
// ...

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

server.use(express.json());

server.get("/", (req, res) => {
  res.send("Hello World!");
});
server.get('/entry/:id', EntryController.Get)

server.post("/entry", EntryController.Create);

server.post("/analyse", AnalysisController.Analyse);
server.post("/transcribe", TranscribeController.Transcribe);
server.post("/users", UsersController.Create);
server.post('/summary', SummaryController.Summarize)

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = server;
