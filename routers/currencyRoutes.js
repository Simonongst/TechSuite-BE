const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');

const { getAllCurrency, createCurrency } = currencyController;

router.get('/', getAllCurrency);
router.post('/', createCurrency);

module.exports = router;