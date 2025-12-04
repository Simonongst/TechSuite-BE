const Currency = require('../models/currency.js');

const getAllCurrency = async (req, res) => {
  try {
    const currency = await Currency.find({});
    res.status(200).json(currency);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

module.exports = {
    getAllCurrency,
}