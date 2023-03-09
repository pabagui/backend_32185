// controladores carritos
// const { randomUUID } = require('crypto');
// const { ContenedorCarrito } = require('../containers/contenedorCarrito');
import  { randomUUID } from 'crypto';
import { ContenedorCarrito } from '../containers/contenedorCarrito.js';

// const carts = [];
// const productos = [];
const carts = new ContenedorCarrito('carritos.txt');

/*
function controllerPostNewCart(newCart) {
    newCart.id_cart = randomUUID();
    carts.saveCart(newCart);
    // carts.push(productos);
    // res.status(201);
    // res.json(newCart);
    return newCart
}
*/

export function controllerPostNewCart() {
        id_cart = randomUUID();
        carts.saveCart(id_cart);
        // return newCart
    }


// function controllerPostProductToCart(id_cart) {
//     carts.postProducts(id_cart)
// }

export function controllerPostProductToCart(id_cart) {
        carts.postProducts(id_cart)
    }

        // const chosenProduct = req.body;
        // const carts[id] = createdCart
        // carts[productos.push](chosenProduct);
        // res.status(201);
        // res.json(chosenProduct);

export  function controllerGetProductsInCart(id_cart) {
        const prodsInCart = carts.getProds(id_cart)
        return prodsInCart
    }

    
export function controllerDeleteProductsByIdInCart(id_cart, id_prod) {
        const deletedProd = carts.deleteProd(id_cart, id_prod)
        return deletedProd
    }

export function controllerDeleteAllProductsInCart(id_cart) {
        const emptyCart = carts.deleteAllProducts(id_cart)
        return emptyCart
    }


//otros controladores auxiliares para ver listado de carritos:
export function controllerGetCarts(req, res){
        res.json(carts);
    }

//está posteando un array vacío
export function controllerGetCartsById({ params: { id_cart } }, res){
        const searchedCart = carts.find(cart => cart.id_cart === id_cart);
        if (!searchedCart) {
            res.status(404);
            res.json({ mensaje: `no se encontró carrito con id (${id_cart})` });
        } else {
            res.json(searchedCart);
        }
    }



// exports.controllerPostNewCart = controllerPostNewCart;
// exports.controllerGetProductsInCart = controllerGetProductsInCart;
// exports.controllerPostProductToCart = controllerPostProductToCart;
// exports.controllerDeleteProductsByIdInCart = controllerDeleteProductsByIdInCart;
// exports.controllerDeleteAllProductsInCart = controllerDeleteAllProductsInCart;
// exports.controllerGetCarts = controllerGetCarts;
// exports.controllerGetCartsById = controllerGetCartsById;

