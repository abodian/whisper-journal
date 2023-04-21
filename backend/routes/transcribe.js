const express = require("express");
const router = express.Router();

const TranscribeController = require("../controllers/transcribe");

router.post("/", TranscribeController.Transcribe);

module.exports = router;
