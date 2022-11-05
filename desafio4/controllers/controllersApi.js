// controladores
const { randomUUID } = require('crypto');
const products = [];


function controllerPostProducts(req, res) {
    // console.log(req);
    const newProduct = req.body;
    newProduct.id = randomUUID();
    products.push(newProduct);
    res.status(201);
    res.json(newProduct);
}

function controllerGetProducts(req, res) {
    res.json(products);
}

function controllerGetProductsById({ params: { id } }, res) {
    const searchedProduct = products.find(prod => prod.id === id);
    if (!searchedProduct) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con id (${id})` });
    } else {
        res.json(searchedProduct);
    }
}

function controllerPutProductsById({ body, params: { id } }, res) {
    const searchedIndex = products.findIndex(prod => prod.id === id);
    if (searchedIndex === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con id (${id})` });
    } else {
        products[searchedIndex] = body;
        res.json(body);
    }
}

function controllerDeleteProductsById({ params: { id } }, res) {
    const searchedIndex = products.findIndex(prod => prod.id === id);
    if (searchedIndex === -1) {
        res.status(404);
        res.json({ mensaje: `no se encontró producto con id (${id})` });
    } else {
        const deletedProducts = products.splice(searchedIndex, 1);
        res.json(deletedProducts[0]);
    }
}


exports.controllerPostProducts = controllerPostProducts;
exports.controllerGetProducts = controllerGetProducts;
exports.controllerGetProductsById = controllerGetProductsById;
exports.controllerPutProductsById = controllerPutProductsById;
exports.controllerDeleteProductsById = controllerDeleteProductsById;