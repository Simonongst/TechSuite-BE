const express = require('express');
const router = express.Router();
const currencyController = require('../controllers/currencyController');

const { getAllCurrency, createCurrency, updateCurrency, deleteCurrency } = currencyController;

router.get('/', getAllCurrency);
router.post('/', createCurrency);
router.put('/:currencyId', updateCurrency);
router.delete('/:currencyId', deleteCurrency);


module.exports = router;