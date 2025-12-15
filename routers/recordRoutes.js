const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController')

const { getAllRecord, createRecord, updateRecord, deleteRecord } = recordController;

router.get('/', getAllRecord);
router.post('/', createRecord);
router.put('/recordId', updateRecord);
router.delete('/recordId', deleteRecord);

module.exports = router;