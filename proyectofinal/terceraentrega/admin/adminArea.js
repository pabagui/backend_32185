import { findEmail } from '../maestros/usuarioMaestro.js'
import { logger } from '../logger/pino.js'


export async function onlyForAdmins({ body }, res, next) {
    const user = await findEmail(body.email)
    try {
      if (user.admin) {
        next()
      } else {
        res.status(403).json('acceso denegado')
      }
    } catch (err) {
      logger.error(err);
      throw new Error('error en loggeo de admin')
    }
  }