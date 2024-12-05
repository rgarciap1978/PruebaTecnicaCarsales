const express = require('express');
const router = express.Router();
const characterController = require('../controllers/characterController');

router.get('', characterController.getCharacters);
router.get('/:id', characterController.getCharacterById);
router.get('/:ids', characterController.getCharactersMultiple);


module.exports = router;