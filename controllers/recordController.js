const Record = require('../models/record');

const getAllRecord = async (req, res) => {
  try {
    const records = await Record.find({ userId: req.user._id }).sort({
      updatedAt: -1,
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

const updateRecord = async (req, res) => {
  try {
    const updatedRecord = await Record.findByIdAndUpdate(
      req.params.recordId,
      req.body,
      { new: true }
    );

    if (!updatedRecord) {
      return res.status(404).json({
        success: false,
        message: 'Record not found.',
      });
    }

    res.status(200).json({ success: true, data: updatedRecord });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

const deleteRecord = async (req, res) => {
  try {
    const deletedRecord = await Record.findByIdAndDelete(req.params.recordId);

    res.status(200).json(deletedRecord);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
  getAllRecord,
  createRecord,
  updateRecord,
  deleteRecord,
};