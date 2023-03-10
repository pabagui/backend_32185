// const express = require('express');
// const { controllerPostNewCart,
//     controllerGetProductsInCart, 
//     controllerPostProductToCart, 
//     controllerDeleteProductsByIdInCart, 
//     controllerDeleteAllProductsInCart } = require('../controllers/controllersApiCart');

import express from 'express';
import { controllerPostNewCart,
    controllerGetProductsInCart, 
    controllerPostProductToCart, 
    controllerDeleteProductsByIdInCart, 
    controllerDeleteAllProductsInCart } from '../controllers/controllersApiCart.js';    

export const routerApiCart = express.Router();

routerApiCart.post('/', async (req, res) => {
    const newCart = await controllerPostNewCart(req.body)
    res.status(201)
    res.json(newCart)
});

//postea producto null en array
routerApiCart.post('/:id_cart/products', async({params: {id_cart}} , res) => {
    const postedProduct = await controllerPostProductToCart(id_cart)
    res.status(201)
    res.json(postedProduct)
});

// routerApiCart.post('/:id_cart/products', async(body, {params: {id_cart}}, res) => {
//     const postedProduct = await controllerPostProductToCart(id_cart, body)
//     res.status(201)
//     res.json(postedProduct)
// });

routerApiCart.get('/:id_cart/products', async ({params: {id_cart}}, res) => {
    const allProducts = await controllerGetProductsInCart(id_cart)
    res.status(200)
    res.json(allProducts)
});

// routerApiProd.get('/:id', async(req, res) => {
//     const searchedProduct = await controllerGetProductsById(req.body)
//     res.status(200)
//     res.json(searchedProduct)
// });




//arreglar método de clase contenedor (update())
routerApiCart.delete('/:id_cart/:id_prod', async({params: {id_cart}, res}) => {
    const searchedIndex = await controllerDeleteProductsByIdInCart(id_cart)
    res.status(200)
    res.json(searchedIndex)
});



routerApiCart.delete('/:id_cart', async({params: {id_cart, id_prod}}, res) => {
    const deletedProd = await controllerDeleteAllProductsInCart(id_cart, id_prod)
    res.status(200)
    res.json(deletedProd)

});


// exports.routerApiCart = routerApiCart;