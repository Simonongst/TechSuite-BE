const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');

const { getAllCurrency, createCurrency, updateCurrency } = currencyController;

router.get('/', getAllCurrency);
router.post('/', createCurrency);
router.put('/:currencyId', updateCurrency);

module.exports = router;