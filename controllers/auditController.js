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

module.exports = {
  getAllAudits,
};
