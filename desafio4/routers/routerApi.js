const express = require('express');
const { controllerPostProducts,
        controllerGetProducts, 
        controllerGetProductsById, 
        controllerPutProductsById, 
        controllerDeleteProductsById } = require('../controllers/controllersApi');

const routerApi = express.Router();

routerApi.post('/', controllerPostProducts);
routerApi.get('/', controllerGetProducts);
routerApi.get('/:id', controllerGetProductsById);
routerApi.put('/:id', controllerPutProductsById);
routerApi.delete('/:id', controllerDeleteProductsById);


exports.routerApi = routerApi;