const Entry = require('../models/entry');

const EntryController = {
  Create: async (req, res) => {
    console.log('Received request payload:', req.body)
    const entry = new Entry(req.body);
    try {
      await entry.save();
      console.log('Entry saved:', entry)
      res.status(201).json({ message: 'Entry created successfully' });
    } catch (err) {
      console.log('Error saving entry:', err)
      res.status(400).json({ message: 'Entry not created' });
    }
  }
  
};

module.exports = EntryController;