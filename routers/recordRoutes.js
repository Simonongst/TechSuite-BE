const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController')

const { getAllRecord, createRecord, updateRecord } = recordController;

router.get('/', getAllRecord);
router.post('/', createRecord);
router.put('/recordId', updateRecord);

module.exports = router;