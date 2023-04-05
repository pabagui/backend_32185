import { Router } from 'express'
import { postVentas } from '../controllers/ventasController.js'

export const ventasRouter = Router()
ventasRouter.post('/', postVentas)