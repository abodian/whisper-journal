const User = require('../models/user');

const UsersController = {
  Create: async (req, res) => {
    const { name, email } = req.body;

    // Check if the user already exists in MongoDB
    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: 'User already exists' });
    }

    // Create a new user in MongoDB
    user = new User({ name, email });
    await user.save();

    res.status(201).json({ message: 'User created' });
  },

  GetByFirebaseUid: async (req, res) => {
    const firebaseUid = req.params.firebaseUid;

    // Find the user in MongoDB by email
    const user = await User.findOne({ email: req.query.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({ ...user.toJSON(), firebaseUid });
  }
};

module.exports = UsersController;

