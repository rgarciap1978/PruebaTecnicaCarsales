const axios = require('axios');

exports.fetchData = async (url) => {
    try{
        const response = await axios.get(url);
        return response.data;
    } catch(e) {
        throw new Error(`Error fetching data from API: ${e}`)
    }
};