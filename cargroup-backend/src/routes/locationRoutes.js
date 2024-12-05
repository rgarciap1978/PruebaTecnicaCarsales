const express = require('express');
const router = express.Router();
const locationController = require('../controllers/locationController');

router.get('/', locationController.getLocations);
router.get('/:id', locationController.getLocationById);
router.get('/:ids', locationController.getLocationsMultiple);


module.exports = router;