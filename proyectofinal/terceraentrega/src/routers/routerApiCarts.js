import express from 'express'
import { Router } from 'express'
// import { addProductsToCart, showProducts, deleteProductInCart, emptyCart, buyProducts } from "../controladores/controladorCarritos";
import { addProductsToCart, showProducts, deleteProductInCart, emptyCart, buyProducts } from '../controladores/controladorCarritos.js'

export default routerApiCart = Router();
// export const routerApiCart = express.Router();

routerApiCart.post('/', async (req, res) => {
    const newCart = await controllerPostNewCart(req.body)
    res.status(201)
    res.json(newCart)
})

routerApiCart.post('/', addProductsToCart)
routerApiCart.get('/', showProducts)
routerApiCart.delete('/:id_prod', deleteProductInCart)
routerApiCart.delete('/', emptyCart)
routerApiCart.post('/buy', buyProducts)
