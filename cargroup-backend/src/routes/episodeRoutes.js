const express = require('express');
const router = express.Router();
const episodeController = require('../controllers/episodeController');

router.get('/', episodeController.get);
router.get('/multiple', episodeController.getMultiple);
router.get('/filter', episodeController.filter);
router.get('/:id', episodeController.getById);

module.exports = router;