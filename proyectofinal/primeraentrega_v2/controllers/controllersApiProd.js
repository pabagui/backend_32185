// controladores productos
const { randomUUID } = require('crypto');
const { ContenedorArchivo } = require('../containers/contenedorProductos');

// const products = [];
const products = new ContenedorArchivo('productos.txt');

function controllerPostProducts(newProduct){
    newProduct.id = randomUUID();
    // products.push(newProduct);
    products.save(newProduct);
    return newProduct
    // res.status(201);
    // res.json(newProduct);
}

function controllerGetProducts(){
    return products.getAll()
    // res.json(products);
    // const allProducts = products.getAll()
    // const allProducts = req.body;
    // products.getAll(allProducts);
    // res.json(allProducts);
}

// function controllerGetProductsById({ params: { id } }, res){
//     // const searchedProduct = products.find(prod => prod.id === id);
//     const searchedProduct = products.getById(id);
//     if (!searchedProduct) {
//         res.status(404);
//         res.json({ mensaje: `no se encontró producto con id (${id})` });
//     } else {
//         res.json(searchedProduct);
//     }

//     return searchedProduct
// }

function controllerGetProductsById(id){
// function controllerGetProductsById({params: { id }}){
    // const searchedProduct = products.find(prod => prod.id === id);
    const searchedProduct = products.getById(id);
    // if (!searchedProduct) {
    //     res.status(404);
    //     res.json({ mensaje: `no se encontró producto con id (${id})` });
    // } else {
    //     res.json(searchedProduct);
    // }

    return searchedProduct
}

// function controllerPutProductsById({ body, params: { id } }, res){
//     const searchedIndex = products.findIndex(prod => prod.id === id);
//     if (searchedIndex === -1) {
//         res.status(404);
//         res.json({ mensaje: `no se encontró producto con id (${id})` });
//     } else {
//         products[searchedIndex] = body;
//         res.json(body);
//     }
// }

function controllerPutProductsById(id){
    const searchedIndex = products.update(id);
    return searchedIndex
}

function controllerDeleteProductsById(id){
    const searchedIndex = products.deleteById(id);
    return searchedIndex
    // const searchedIndex = products.findIndex(prod => prod.id === id);
    // if (searchedIndex === -1) {
    //     res.status(404);
    //     res.json({ mensaje: `no se encontró producto con id (${id})` });
    // } else {
    //     const deletedProducts = products.splice(searchedIndex, 1);
    //     res.json(deletedProducts[0]);
    // }
}


exports.controllerPostProducts = controllerPostProducts;
exports.controllerGetProducts = controllerGetProducts;
exports.controllerGetProductsById = controllerGetProductsById;
exports.controllerPutProductsById = controllerPutProductsById;
exports.controllerDeleteProductsById = controllerDeleteProductsById;