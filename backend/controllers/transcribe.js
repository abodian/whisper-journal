const mongoose = require("mongoose");
const multer = require("multer");
const { chatGPTTranscribe } = require("../gpt");
const Transcription = require("../models/transcription");
const ffmpeg = require("fluent-ffmpeg");

// Multer configuration
// const upload = multer();

const fs = require("fs");

function base64ToFile(base64String, filePath) {
  const buffer = Buffer.from(base64String, "base64");
  fs.writeFileSync(filePath, buffer);
}

function convertInternal(video, sampleRate, mp3path) {
  return new Promise((resolve, reject) => {
    const command = ffmpeg(video, {
      nolog: true,
    })
      // options to convert to mp3
      .withAudioCodec("libmp3lame")
      .audioFrequency(sampleRate)
      .toFormat("mp3")
      .saveToFile(mp3path);

    command.on("end", () => {
      resolve();
    });

    command.on("error", (err) => {
      reject(err);
    });
  });
}

const TranscribeController = {
  Transcribe: async (req, res) => {
    try {
      const { audioBase64 } = req.body;
      console.log("backend", audioBase64);
      if (!audioBase64 || typeof audioBase64 !== "string") {
        return res.status(400).json({
          message: "No audio data received or the data is not a string",
        });
      }

      // Convert base64 to a Buffer
      const audioBuffer = Buffer.from(audioBase64, "base64");
      // console.log(audioBuffer.toString("hex"));

      // Generate a temporary file name using a timestamp
      const tempFileName = `temp_audio_${Date.now()}.3gp`;
      console.log("Audio buffer length:", audioBuffer.length);

      // Write the buffer to a temporary .m4a file
      base64ToFile(audioBase64, tempFileName);

      const outputFileName = `output_${Date.now()}.mp3`;
      const sampleRate = 44100;
      await convertInternal(tempFileName, sampleRate, outputFileName);

      const transcription = await chatGPTTranscribe(`./${outputFileName}`);
      // const storedAnalysis = new Transcription({ result: transcription });
      // await storedAnalysis.save();
      console.log(transcription);
      res.send({
        type: "POST",
        transcription: transcription,
        audioFileName: outputFileName,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
};

module.exports = TranscribeController;
