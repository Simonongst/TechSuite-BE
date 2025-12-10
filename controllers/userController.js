const User = require('../models/user.js');
const bcrypt = require('bcrypt');

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { eid, email, ...newUser } = req.body;

    if (eid) {
      const eidExists = await User.findOne({ eid });
      if (eidExists) {
        return res.json({
          success: false,
          message: 'EID already exists.',
        });
      }
    }

    if (email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.json({
          success: false,
          message: 'Email already exists.',
        });
      }
    }

    const userToSave = new User({ eid, email, ...newUser });

    const hashedPassword = bcrypt.hashSync(userToSave.password, 10);
    userToSave.password = hashedPassword;

    const savedUser = await User.create(userToSave);
    const { password, ...userWithoutPassword } = savedUser.toObject();

    res.status(201).json({ success: true, data: userWithoutPassword });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
};