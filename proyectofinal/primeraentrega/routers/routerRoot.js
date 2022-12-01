const express = require('express');
const { controllerGetRoot } = require('../controllers/controllersRoot');

const routerRoot = express.Router();

routerRoot.get('/', controllerGetRoot);


exports.routerRoot = routerRoot;