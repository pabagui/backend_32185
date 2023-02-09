import  express from 'express'
import { controllerGetRandoms } from '../controllers/controllerGetRandoms.js'

const routerRandoms = express.Router()
export default routerRandoms.get('/', controllerGetRandoms)