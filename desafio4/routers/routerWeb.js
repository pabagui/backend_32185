const express = require('express');
const { controllerGetRoot } = require('../controllers/controllersRoot');

const routerWeb = express.Router();

routerWeb.get('/', controllerGetRoot);


exports.routerWeb = routerWeb;