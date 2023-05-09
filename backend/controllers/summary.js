const { chatGPTSummary } = require('../gpt');
const Summary = require('../models/summary')

const SummaryController = {
    Summarize: async (req, res) => {
      try {
        // console.log('body', req.body);
        const prompt = req.body.diaryEntry;
        // console.log('Diary Entry:', prompt);
        const userId = req.body.userId; // user id from req object
        // console.log('User:', userId);
        const summary = await chatGPTSummary(prompt);
        const newSummary = new Summary({
          userId: userId,
          date: new Date(),
          summary: summary
        });
        await newSummary.save();
        res.status(201).json({ summary });
        // console.log("sumary", summary)
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
      }
    },
  };


module.exports = SummaryController