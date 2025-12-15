const express = require('express');
const router = express.Router();
const recordController = require('../controllers/recordController')

const { getAllRecord, createRecord } = recordController;

router.get('/', getAllRecord);
router.post('/', createRecord);

module.exports = router;