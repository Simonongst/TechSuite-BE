const express = require('express');
const router = express.Router();
const { signUp, signIn } = require('../controllers/authController.js');

router.post('/sign-up', signUp);
router.post('/sign-up', signIn);

module.exports = router;
