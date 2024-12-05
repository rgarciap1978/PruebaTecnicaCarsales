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

exports.filterEpisodes = async (req, res, next) => {

    const { name, status, species, type, gender } = req.query;
    let url = 'https://rickandmortyapi.com/api/episode/'

    const params = new URLSearchParams();
    name && params.append('name', name);
    status && params.append('status', status);
    species && params.append('species', species);
    type && params.append('type', type);
    gender && params.append('gender', gender);

    if(params.toString()){
        url += `?${params.toString()}`; 
    }
    
    try {
        const data = await apiService.fetchData(url);
        res.json(data);
    } catch(e) {
        next(e);
    }
};