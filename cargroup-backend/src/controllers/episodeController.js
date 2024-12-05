const apiService = require('../services/apiService');
const urlBase = 'https://rickandmortyapi.com/api/episode';

exports.getEpisodes = async (req, res, next) => {
    try {
        const data = await apiService.fetchData(urlBase);
        res.json(data);
    } catch(e) {
        next(e);
    }
};

exports.getEpisodeById = async (req, res, next) => {
    try {
        const data = await apiService.fetchData(`${urlBase}/${req.params.id}`);
        res.json(data);
    } catch(e) {
        next(e);
    }
};

exports.getEpisodesMultiple = async (req, res, next) => {

    const ids = req.query.ids;
    
    try {
        const data = await apiService.fetchData(`${urlBase}/${ids}`);
        res.json(data);
    } catch(e) {
        next(e);
    }
};
