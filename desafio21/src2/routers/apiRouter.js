
import { Router, json, urlencoded } from 'express'
import { ventasRouter } from './ventasRouter.js'
import { errorHandler } from '../middlewares/errorsMiddleware.js'

export const apiRouter = Router()

apiRouter.use(json())
apiRouter.use(urlencoded({ extended: true }))

apiRouter.use('/ventas', ventasRouter)

apiRouter.use(errorHandler)