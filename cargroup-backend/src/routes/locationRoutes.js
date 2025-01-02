const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.get('/', locationController.get);
router.get('/multiple', locationController.getMultiple);
router.get('/filter', locationController.filter)
router.get('/:id', locationController.getById);

module.exports = router;