const express = require("express");
const server = express();
const port = process.env.PORT || 3001;
const mongoose = require("mongoose");
const { Configuration, OpenAIApi } = require("openai");
const EntryController = require("./controllers/entry");

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

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// gpt code
const configuration = new Configuration({
  apiKey: "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",
});

const openai = new OpenAIApi(configuration);
const chapGPT = async (prompt) => {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that translates English to French.",
      },
      {
        role: "user",
        content:
          'Translate the following English text to French: "I very much like cheese and wine"',
      },
    ],
  });
  console.log(response["data"]["choices"][0]["message"]["content"]);
};

chapGPT();

module.exports = server;
