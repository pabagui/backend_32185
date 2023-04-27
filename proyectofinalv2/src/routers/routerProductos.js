import { Router } from 'express'
import { postProductController, 
         getProductsController,
         getProductByIdController,
         updateProductByIdController,
         deleteProductByIdController
        } from '../controllers/controladorProductos.js'

export const routerApiProducts = new Router()



routerApiProducts.post('/api/products',postProductController) //agregar controller adminCheck
routerApiProducts.get('/api/products', getProductsController) 
routerApiProducts.get('/api/products/:id', getProductByIdController)
routerApiProducts.put('/api/products/:id', updateProductByIdController) //agregar controller adminCheck
routerApiProducts.delete('/api/products/:id', deleteProductByIdController ) //agregar controller adminCheck
