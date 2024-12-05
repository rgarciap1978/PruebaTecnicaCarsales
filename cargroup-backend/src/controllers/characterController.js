const apiService = require('../services/apiService');
const urlBase = 'https://rickandmortyapi.com/api/character';

exports.getCharacters = async (req, res, next) => {
    try {
        const data = await apiService.fetchData(urlBase);
        res.json(data);
    } catch(e) {
        next(e);
    }
};

exports.getCharacterById = async (req, res, next) => {
    try {
        const data = await apiService.fetchData(`${urlBase}/${req.params.id}`);
        res.json(data);
    } catch(e) {
        next(e);
    }
};

exports.getCharactersMultiple = async (req, res, next) => {

    const ids = req.query.ids; 
    
    try {
        const data = await apiService.fetchData(`${urlBase}/${ids}`);
        res.json(data);
    } catch(e) {
        next(e);
    }
};
