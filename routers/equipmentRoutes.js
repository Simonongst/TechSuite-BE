const express = require('express');
const router = express.Router();
const equipmentController = require('../controllers/equipmentController');

const { getAllEquipment, createEquipment, updateEquipment, deleteEquipment } = equipmentController;

router.get('/', getAllEquipment);
router.post('/', createEquipment);
router.put('/:equipmentId', updateEquipment);
router.delete('/:equipmentId', deleteEquipment);

module.exports = router;