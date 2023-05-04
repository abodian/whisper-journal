const mongoose = require('mongoose');
const Analysis = require('../models/analyse');
const { chatGPT } = require('../gpt');

const AnalysisController = {
  Analyse: async (req, res) => {
    try {
      console.log('body', req.body)
      const prompt = req.body.prompt;
      console.log('Prompt:', prompt);
      const userId = new mongoose.Types.ObjectId(req.body.userId) // users id from req object
      console.log('user', userId)
      const analysis = await chatGPT(prompt);
      const newAnalysis = new Analysis({ result: analysis, userId: userId });
      await newAnalysis.save();
      res.status(201).json({ analysis });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },
};

module.exports = AnalysisController;
