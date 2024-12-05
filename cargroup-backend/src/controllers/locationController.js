const apiService = require('../services/apiService');
const urlBase = 'https://rickandmortyapi.com/api/location';

exports.getLocations = async (req, res, next) => {
    try {
        const data = await apiService.fetchData(urlBase);
        res.json(data);
    } catch(e) {
        next(e);
    }
};

exports.getLocationById = async (req, res, next) => {
    try {
        const data = await apiService.fetchData(`${urlBase}/${req.params.id}`);
        res.json(data);
    } catch(e) {
        next(e);
    }
};

exports.getLocationsMultiple = async (req, res, next) => {

    const ids = req.query.ids;
    try {
        const data = await apiService.fetchData(`${urlBase}/${ids.join(',')}`);
        res.json(data);
    } catch(e) {
        next(e);
    }
};
