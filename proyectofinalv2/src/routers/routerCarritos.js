import { Router } from 'express';
import { postProductToCartController,
         getProductsInCartController,
         deleteProductByIdInCartController } from '../controllers/controladorCarritos.js';
import { authenticationMiddleware } from '../controllers/controladorUsuarios.js'

export const routerApiCarts = new Router()

routerApiCarts.post('/api/shoppingcartproducts', authenticationMiddleware, postProductToCartController) 
routerApiCarts.get('/api/shoppingcartproducts', authenticationMiddleware, getProductsInCartController) 
routerApiCarts.delete('/api/shoppingcartproducts/:id_prod', authenticationMiddleware, deleteProductByIdInCartController) 


