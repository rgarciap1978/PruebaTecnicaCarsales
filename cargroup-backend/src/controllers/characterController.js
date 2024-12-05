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

exports.filterCharacters = async (req, res, next) => {

    const { name, status, species, type, gender } = req.query;

    // Usa URLSearchParams para construir los parámetros
    const params = new URLSearchParams();
    if (name) params.append('name', name);
    if (status) params.append('status', status);
    if (species) params.append('species', species);
    if (type) params.append('type', type);
    if (gender) params.append('gender', gender);

    // Construcción de la URL final para la API
    let finalUrl = baseUrl;
    if (params.toString()) {
        finalUrl += `/?${params.toString()}`;  // Añade los parámetros a la URL base
    }
    
    try {
        const data = await apiService.fetchData(finalUrl);
        res.json(data);
    } catch(e) {
        next(e);
    }
};