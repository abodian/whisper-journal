const User = require("../models/user");
const { createUser } = require("../firebase-admin");

const UsersController = {
  Create: async (req, res) => {
    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    if (user) {
      return res.status(409).json({ message: "User already exists" });
    }

    user = new User({ name, email });
    await user.save();
    
    let mongoUser = await User.findOne({ email });
    let firebaseUid = mongoUser._id.toString();

    await createUser(firebaseUid, email, password);

    res.status(201).json({ message: "User created in MongoDB and Firebase" });
  },
};


module.exports = UsersController;
