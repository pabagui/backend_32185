// const express = require('express');
// const { controllerGetRoot } = require('../controllers/controllersRoot');

import express from 'express';
import { controllerGetRoot } from '../controllers/controllersRoot.js';

export const routerRoot = express.Router();

routerRoot.get('/', controllerGetRoot);


// exports.routerRoot = routerRoot;