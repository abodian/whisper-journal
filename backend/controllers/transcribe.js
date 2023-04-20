const mongoose = require("mongoose)");
const { chatGPTTranscribe } = require("../gpt");
const Transcription = require("../models/transcription");

const TranscribeController = {
  Transcribe: async (req, res) => {
    try {
      const file = req.body.file;
      const transcription = await chatGPTTranscribe(file);
      const storedAnalysis = new Transcription({ result: transcription });
      await storedAnalysis.save();
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json({ message: "Internal server error (transcription)" });
    }
  },
};

module.exports = TranscribeController;
