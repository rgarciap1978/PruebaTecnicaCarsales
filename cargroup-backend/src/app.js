const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const characterRoutes = require('./routes/characterRoutes');
const episodeRoutes = require('./routes/episodeRoutes');
const locationRoutes = require('./routes/locationRoutes');

const app = express();
app.use(express.json());

const corsOptions = {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOptions));

// RUTAS SERVICIOS
app.use('/api/character', characterRoutes);
app.use('/api/episode', episodeRoutes);
app.use('/api/location', locationRoutes);

// MANEJO DE EXCEPCIONES
app.use(require('./utils/errorHandler'));

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`CORS origin set to: ${process.env.CORS_ORIGIN || '*'}`);
});