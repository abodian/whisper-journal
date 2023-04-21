const express = require("express");
const server = express();
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const EntryController = require("./controllers/entry");
const AnalysisController = require("./controllers/analyse");
const UsersController = require("./controllers/user");

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


server.post('/analyse', AnalysisController.Analyse);

server.post('/users', UsersController.Create);


server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

module.exports = server;
