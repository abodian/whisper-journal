const Entry = require('../models/entry');

const EntryController = {
  Create: async (req, res) => {
    const entry = new Entry(req.body);
    try {
      await entry.save();
      res.status(201).json({ message: 'Entry created successfully' });
    } catch (err) {
      res.status(400).json({ message: 'Entry not created' });
    }
  }
  
};

module.exports = EntryController;