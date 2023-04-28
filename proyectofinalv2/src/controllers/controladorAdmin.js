import { logger } from '../../config/logger.js'
import { buscar } from '../daos/mongodbDao.js'

export async function validarAdmin(req, res, next) {
    if (req.isAuthenticated()) {
        await buscar('users')
        .then(result => {
            const user = result.find(r => r.email === req.user.email)
            if (user.role === "admin") {
                next()
            } else {
                logger.error(`usuario no es admin ${req.user.email}`)
                res.status(403)
                res.json('Usuario no es admin')
            }
        })
        .catch(err => {
            logger.error(`error de validación de admin: ${err}`)
            res.status(500)
            res.json(err)
        })
    } else {
        logger.error(`usuario no autenticado`)
        res.status(403)
        res.json('usuario no autenticado')
    }
}
