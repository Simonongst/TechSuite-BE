const Currency = require('../models/currency.js');

const getAllCurrency = async (req, res) => {
  try {
    const currency = await Currency.find({});
    res.status(200).json(currency);
  } catch (err) {
    res.status(500).json({ err: err.message });
  }
};

const createCurrency = async (req, res) => {
  try {
    const { code, ...currencyData } = req.body;

    if (!code) {
      return res.status(400).json({
        success: false,
        message: 'Currency code is required.',
      });
    }

    const codeExists = await Currency.findOne({ code });
    if (codeExists) {
      return res.json({
        success: false,
        message: 'Code already exists.',
      });
    }

    const newCurrency = new Currency({ code, ...currencyData });
    const savedCurrency = await newCurrency.save();

    res.status(201).json({ success: true, data: savedCurrency });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};

module.exports = {
  getAllCurrency,
  createCurrency,
};
