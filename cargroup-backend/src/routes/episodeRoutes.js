const express = require('express');
const router = express.Router();
const episodeController = require('../controllers/episodeController');

router.get('/', episodeController.getEpisodes);
router.get('/:id', episodeController.getEpisodeById);
router.get('/:ids', episodeController.getEpisodesMultiple);
router.get('/filter', episodeController.filterEpisodes);

module.exports = router;