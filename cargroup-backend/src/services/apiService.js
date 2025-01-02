const axios = require('axios');
require('dotenv').config();

const apiClient = axios.create({
    baseURL: process.env.BASE_URL,
});

exports.fetchData = async (endpoint) => {
    try {
        const response = await apiClient.get(endpoint);
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.error || 'Error fetching data');
    }
};
