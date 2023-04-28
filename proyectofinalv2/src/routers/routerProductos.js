import { Router } from 'express'
import { postProductController, 
         getProductsController,
         getProductByIdController,
         updateProductByIdController,
         deleteProductByIdController
        } from '../controllers/controladorProductos.js'
import { validarAdmin } from '../controllers/controladorAdmin.js'        

export const routerApiProducts = new Router()



routerApiProducts.post('/api/products', validarAdmin,  postProductController) 
routerApiProducts.get('/api/products', getProductsController) 
routerApiProducts.get('/api/products/:id', getProductByIdController)
routerApiProducts.put('/api/products/:id', validarAdmin, updateProductByIdController) 
routerApiProducts.delete('/api/products/:id', validarAdmin, deleteProductByIdController ) 
