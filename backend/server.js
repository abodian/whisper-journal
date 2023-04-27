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

const whisperJournalSDK = require("./whisper-journal-4ef93-firebase-adminsdk-xjbi8-f4a173182a");

// Use the configuration values
whisperJournalSDK.private_key_id = process.env.PRIVATE_KEY_ID;
whisperJournalSDK.private_key = process.env.PRIVATE_KEY;

// Use the service account credentials
// ...

mongoose
  .connect(
    "mongodb+srv://AlexB:bodianA@cluster0.dekgoyo.mongodb.net/whisper_journal_cloud",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
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

server.post("/entry", EntryController.Create);

server.post("/analyse", AnalysisController.Analyse);
server.post("/transcribe", TranscribeController.Transcribe);
server.post("/users", UsersController.Create);

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = server;
