const express = require('express');
const { controllerPostProducts,
        controllerGetProducts, 
        controllerGetProductsById, 
        controllerPutProductsById, 
        controllerDeleteProductsById } = require('../controllers/controllersApiProd');

const routerApiProd = express.Router();

routerApiProd.post('/', async (req, res) => {
    const newProduct = await controllerPostProducts(req.body)
    res.status(201)
    res.json(newProduct)
});

routerApiProd.get('/', async (req, res) => {
    const allProducts = await controllerGetProducts(req.body)
    res.status(200)
    res.json(allProducts)
});

// routerApiProd.get('/:id', async(req, res) => {
//     const searchedProduct = await controllerGetProductsById(req.body)
//     res.status(200)
//     res.json(searchedProduct)
// });

routerApiProd.get('/:id', async({params: {id}}, res) => {
    const searchedProduct = await controllerGetProductsById(id)
    res.status(200)
    res.json(searchedProduct)
});


//arreglar método de clase contenedor (update())
routerApiProd.put('/:id', async({params: {id}, res}) => {
    const searchedIndex = await controllerPutProductsById(id)
    res.status(200)
    res.json(searchedIndex)
});



routerApiProd.delete('/:id', async({params: {id}}, res) => {
    const searchedIndex = await controllerDeleteProductsById(id)
    res.status(200)
    res.json(searchedIndex)

});


exports.routerApiProd = routerApiProd;