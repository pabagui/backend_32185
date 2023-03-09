import { bcrypt } from 'bcrypt'
import { SECRET } from '../config/config'
import { logger } from '../logger/pino'
import { findEmail } from '../maestros/usuarioMaestro'



export function encryptPassword(password) {
    return bcrypt.hashSync(password, SECRET)
  }
  
  export async function checkPassword(body) {
    try {
      const user = await findEmail(body.email)
      const answer = bcrypt.compareSync(body.password, user.password)
      if (!answer) throw new Error('password incorrecta')
  
      return true
    } catch (err) {
      logger.error(err)
      throw new Error("error al validar password")
    }
  }