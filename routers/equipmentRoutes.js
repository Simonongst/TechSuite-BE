const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

const { getAllEquipment } = equipmentController;

router.get('/', getAllEquipment);

module.exports = router;