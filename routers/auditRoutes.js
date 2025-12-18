const express = require('express');
const router = express.Router();
const auditController = require('../controllers/auditController');

const { getAllAudits, createAudit, deleteAudit } = auditController;

router.get('/', getAllAudits);
router.post('/', createAudit);
router.delete('/:auditId', deleteAudit);

module.exports = router;