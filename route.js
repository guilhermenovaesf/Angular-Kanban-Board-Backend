const express = require('express');
const routes = express.Router();

const cardsController = require('./src/controllers/cardsController');


routes.get('/cards', cardsController.index);
routes.post('/cards', cardsController.create);

module.exports = routes;
