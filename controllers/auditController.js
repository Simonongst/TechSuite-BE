const Audit = require('../models/audit.js');

const getAllAudits = async (req, res) => {
  try {
    const audits = await Audit.find(
      {},
      'userId category label date isComplete createdAt'
    ).populate('userId', 'username email');
    res.status(200).json(audits);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const createAudit = async (req, res) => {
  try {
    const { userId, category, label, date, isComplete } = req.body;
    if (!userId || !category || !label) {
      return res.status(400).json({
        success: false,
        message: 'userId, category and label are required.',
      });
    }
    const newAudit = new Audit({
      userId,
      category,
      label,
      date: date || new Date(),
      isComplete: isComplete ?? true,
    });
    const savedAudit = await newAudit.save();
    res.status(201).json({ success: true, data: savedAudit });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  getAllAudits,
  createAudit,
};
