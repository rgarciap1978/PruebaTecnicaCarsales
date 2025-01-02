const apiService = require('../services/apiService');

exports.get = async (req, res, next) => {
    try {
        const data = await apiService.fetchData('/episode');
        if (data.results === null) {
            res.status(204).json({
                success: false
            });
        } else {
            const info = data.info;
            info.prev = getPage(info.prev);
            info.next = getPage(info.next);

            res.status(200).json({
                success: true,
                errorMessage: '',
                info: info,
                results: data.results
            });
        }
    } catch(e) {
        next(e);
    }
};

exports.getById = async (req, res, next) => {
    try {
        const data = await apiService.fetchData(`/episode/${req.params.id}`);
        if (data === null) {
            res.status(404).join({
                success: false,
                errorMessage: 'No se encontró el episodio.'
            });
        } else {
            res.status(200).json({
                success: true,
                errorMessage: '',
                results: data
            });
        }
    } catch(e) {
        next(e);
    }
};

exports.getMultiple = async (req, res, next) => {

    const ids = req.query.ids;
    
    try {
        const data = await apiService.fetchData(`/episode/${ids}`);
        if (data.length === 0) {
            res.status(204).end();
        } else {
            res.status(200).json({
                success: true,
                errorMessage: '',
                results: data
            });
        }
    } catch(e) {
        next(e);
    }
};

exports.filter = async (req, res, next) => {
    const { page, name, type, dimension } = req.query;

    const params = [
        page && `page=${page}`,
        name && `name=${name}`,
        type && `type=${type}`,
        dimension && `dimension=${dimension}`
    ].filter(Boolean)
    .join('&');

    try {
        const data = await apiService.fetchData(`/episode/${params ? `?${params}` : ''}`);
        if (data.results === null) {
            res.status(204).json({
                success: false,
                errorMessage: 'No se encontraron episodios'
            });
        } else {
            const info = data.info;
            info.prev = getPage(info.prev);
            info.next = getPage(info.next);

            const results = data.results;

            res.status(200).json({
                success: true,
                errorMessage: '',
                info: info,
                results: results
            });
        }
    } catch(e) {
        next(e);
    }
}

getPage = (url) => {
    if (url === null) return '';
    const params = new URL(url).searchParams;
    
    return params.get('page');
}
