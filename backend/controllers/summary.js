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
        const date = req.body.date
        const summary = await chatGPTSummary(prompt);
        const newSummary = new Summary({
          _id: `${userId}_${date}`,
          userId: userId,
          date: date,
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