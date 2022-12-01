const express = require('express');
const { controllerPostNewCart,
        controllerGetProductsInCart, 
        controllerPostProductToCart, 
        controllerDeleteProductsByIdInCart, 
        controllerDeleteAllProductsInCart,
        controllerGetCarts,
        controllerGetCartsById } = require('../controllers/controllersApiCart');

const routerApiCart = express.Router();

routerApiCart.post('/', controllerPostNewCart);
routerApiCart.get('/:id_cart/products', controllerGetProductsInCart);
routerApiCart.post('/:id_cart/products', controllerPostProductToCart);
routerApiCart.delete('/:id_cart/:id_prod', controllerDeleteProductsByIdInCart);
routerApiCart.delete('/:id_cart', controllerDeleteAllProductsInCart);

//otras rutas auxiliares para ver listado de carritos:
routerApiCart.get('/', controllerGetCarts);
routerApiCart.get('/:id_cart', controllerGetCartsById);


exports.routerApiCart = routerApiCart;