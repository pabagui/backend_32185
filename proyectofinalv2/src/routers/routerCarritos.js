import { Router } from 'express';
import { postProductToCartController,
         getProductsInCartController,
         deleteProductByIdInCartController } from '../controllers/controladorCarritos.js';
// import { checkAuthentication } from '../controllers/usersController.js';

export const routerApiCarts = new Router()

routerApiCarts.post('/api/shoppingcartproducts', postProductToCartController) //agregar middleware usuarios logueados
routerApiCarts.get('/api/shoppingcartproducts', getProductsInCartController) //agregar middleware usuarios logueados
routerApiCarts.delete('/api/shoppingcartproducts/:id_prod', deleteProductByIdInCartController) //agregar middleware usuarios logueados


