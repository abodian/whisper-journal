const mongoose = require("mongoose");
const multer = require("multer");
const { chatGPTTranscribe } = require("../gpt");
const Transcription = require("../models/transcription");

// Multer configuration
const upload = multer();

const TranscribeController = {
  upload: upload.any("file"),
  Transcribe: async (req, res) => {
    try {
      if (!req.files || req.files.length === 0) {
        // check if req.files is undefined or empty
        return res.status(400).json({ message: "No file received" });
      }
      const audio_file = req.files[0];
      console.log(audio_file);
      const { buffer } = audio_file;
      // console.log(buffer);

      const transcription = await chatGPTTranscribe(
        "./transcriptionTestFile.m4a"
      );
      // const storedAnalysis = new Transcription({ result: transcription });
      // await storedAnalysis.save();
      console.log(transcription);
      res.send({
        type: "POST",
        transcription: transcription,
        audioFileName: buffer.name,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = TranscribeController;
