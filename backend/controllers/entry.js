const Entry = require("../models/entry");

const EntryController = {
  Create: async (req, res) => {
    console.log("Received request payload:", req.body);
    const entry = new Entry(req.body);
    console.log(entry);
    try {
      await entry.save();
      console.log("Entry saved:", entry);
      res.status(201).json({ message: "Entry created successfully" });
    } catch (err) {
      console.log("Error saving entry:", err);
      res.status(400).json({ message: "Entry not created" });
    }
  },

  Get: async (req, res) => {
    const entry = await Entry.findById(req.params.id);
    try {
      if (!entry) {
        return res.status(404).json({ message: "Entry not found" });
      }
      res.json(entry);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  },
};

module.exports = EntryController;
