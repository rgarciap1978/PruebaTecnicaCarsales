const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

router.get('', characterController.get);
router.get('/multiple', characterController.getMultiple);
router.get('/filter', characterController.filter);
router.get('/:id', characterController.getById);

module.exports = router;