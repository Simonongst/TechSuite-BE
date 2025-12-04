const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');

const { getAllCurrency } = currencyController;

router.get('/', getAllCurrency);

module.exports = router;