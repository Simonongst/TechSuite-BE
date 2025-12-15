const Record = require('../models/record');

const getAllRecord = async (req, res) => {
  try {
    const records = await Record.find({ userId: req.user._id }).sort({
      createdAt: -1,
    });
    res.status(200).json({ success: true, records });
  } catch (err) {
    res.status(500).json({ success: false, err: err.message });
  }
};

const createRecord = async (req, res) => {
  try {
    const { form, summary } = req.body;
    const userId = req.user._id;

    if (!form || !summary) {
      return res.status(400).json({
        success: false,
        message: 'Form inputs and summary are required.',
      });
    }

    const newRecord = new Record({ userId, form, summary });
    const savedRecord = await newRecord.save();

    res.status(201).json({ success: true, data: savedRecord });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  getAllRecord,
  createRecord,
};