import { Router } from 'express'
import { controllerPostOrder, controllerGetAllOrders } from '../controllers/controladorOrdenes.js'
import { authenticationMiddleware } from '../controllers/controladorUsuarios.js'

export const routerApiOrders = new Router()



routerApiOrders.post('/api/orders', authenticationMiddleware, controllerPostOrder )
routerApiOrders.get('/api/orders', authenticationMiddleware, controllerGetAllOrders ) 
