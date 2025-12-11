const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
const User = require('../models/user.js');

const signUp = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ eid: req.body.eid });
    if (userInDatabase) {
      return res.status(409).send('This Enterprise ID is already in use.');
    }

    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;

    await User.create(req.body);

    res.status(201).json({
      message:
        'Sign-up successful. You can now sign in from the sign-in screen',
    });
  } catch (err) {
    res.status(500).send({ err: err.message });
  }
};

const signIn = async (req, res) => {
  try {
    const userInDatabase = await User.findOne({ eid: req.body.eid });
    if (!userInDatabase) {
      return res
        .status(401)
        .send('Sign-in failed. Invalid Enterprise ID or Password.');
    }

    const validPassword = bcrypt.compareSync(
      req.body.password,
      userInDatabase.password
    );
    if (!validPassword) {
      return res
        .status(401)
        .send('Login failed. Invalid Enterprise ID or Password.');
    }

    const claims = {
      _id: userInDatabase._id.toString(),
      username: userInDatabase.username,
      eid: userInDatabase.eid,
      role: userInDatabase.role,
    };

    const access = jwt.sign(claims, process.env.ACCESS_SECRET, {
      expiresIn: '1d',
      jwtid: uuidv4(),
    });

    const refresh = jwt.sign(claims, process.env.REFRESH_SECRET, {
      expiresIn: '30d',
      jwtid: uuidv4(),
    });

    res.status(200).json({ access, refresh });
  } catch (err) {
    res.status(500).redirect('/');
  }
};

const changePassword = async (req, res) => {
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (newPassword !== confirmPassword) {
    return res.json({ success: false, message: 'Passwords do not match' });
  }

  const user = await User.findById(req.user._id);
  const ok = await bcrypt.compare(oldPassword, user.password);

  if (!ok) {
    return res.json({ success: false, message: 'Wrong password' });
  }

  const hashed = await bcrypt.hash(newPassword, 10);
  user.password = hashed;
  await user.save();

  res.json({ success: true, message: 'Password successfully updated.' });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user)
    return res.json({
      message: 'If the account exists, an email will be sent to you.',
    });

  const token = jwt.sign({ userId: user._id }, process.env.RESET_SECRET, {
    expiresIn: '15m',
  });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await transporter.sendMail({
    to: user.email,
    subject: 'Reset your password',
    text: ResetPassword.text(resetUrl),
    html: ResetPassword.html(resetUrl)
  });

  res.json({ message: 'Check your email for reset instructions.' });
};

module.exports = {
  signUp,
  signIn,
  changePassword,
  forgotPassword,
};