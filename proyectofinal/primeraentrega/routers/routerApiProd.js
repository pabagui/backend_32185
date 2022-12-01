const express = require('express');
const { controllerPostProducts,
        controllerGetProducts, 
        controllerGetProductsById, 
        controllerPutProductsById, 
        controllerDeleteProductsById } = require('../controllers/controllersApiProd');

const routerApiProd = express.Router();

routerApiProd.post('/', controllerPostProducts);
routerApiProd.get('/', controllerGetProducts);
routerApiProd.get('/:id', controllerGetProductsById);
routerApiProd.put('/:id', controllerPutProductsById);
routerApiProd.delete('/:id', controllerDeleteProductsById);


exports.routerApiProd = routerApiProd;