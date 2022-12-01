// controladores carritos
const { randomUUID } = require('crypto');
const { ContenedorArchivo } = require('../Contenedor');

const carts = [];
const productos = [];

function controllerPostNewCart(req, res) {
    const newCart = req.body;
    newCart.id_cart = randomUUID();
    carts.push(newCart);
    // carts.push(productos);
    res.status(201);
    res.json(newCart);
}

function controllerGetProductsInCart(req, res) {
    res.json(productos);
}

function controllerPostProductToCart({ params: { id_cart } }, res) {
    const searchedCart = carts.find(cart => cart.id_cart === id_cart);
    if (!searchedCart) {
        res.status(404);
        res.json({ mensaje: `no se encontró carrito con id (${id_cart})` });
    } else {
        // res.json(searchedCart);
        // let chosenProduct = productos.push()
        // carts.push(chosenProduct) //cómo elijo el producto

        let chosenProduct = req.body
        productos.push(chosenProduct)
        res.json(searchedCart);
    }   
}

    // const chosenProduct = req.body;
    // const carts[id] = createdCart
    // carts[productos.push](chosenProduct);
    // res.status(201);
    // res.json(chosenProduct);

function controllerDeleteProductsByIdInCart({ params: { id } }, res) {
    
}

function controllerDeleteAllProductsInCart({ params: { id } }, res) {
    
}


//otros controladores auxiliares para ver listado de carritos:
function controllerGetCarts(req, res){
    res.json(carts);
}

//está posteando un array vacío
function controllerGetCartsById({ params: { id_cart } }, res){
    const searchedCart = carts.find(cart => cart.id_cart === id_cart);
    if (!searchedCart) {
        res.status(404);
        res.json({ mensaje: `no se encontró carrito con id (${id_cart})` });
    } else {
        res.json(searchedCart);
    }
}

exports.controllerPostNewCart = controllerPostNewCart;
exports.controllerGetProductsInCart = controllerGetProductsInCart;
exports.controllerPostProductToCart = controllerPostProductToCart;
exports.controllerDeleteProductsByIdInCart = controllerDeleteProductsByIdInCart;
exports.controllerDeleteAllProductsInCart = controllerDeleteAllProductsInCart;
exports.controllerGetCarts = controllerGetCarts;
exports.controllerGetCartsById = controllerGetCartsById;