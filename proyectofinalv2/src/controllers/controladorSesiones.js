
import { logger } from '../../config/logger.js';
import { ValidadorDeLogin } from '../validators/validadores.js'
import { sesionService } from '../services/sesionService.js';


export class SessionController {

  async validarUsuario({ body }, res, next) {
    try {
      new ValidadorDeLogin(body);
      const token = await sesionService.autenticarUsuario(body);

      res.status(200).header('Authorization', token).json({ token: token });
    } catch (error) {
      logger.error(error);
      next(e);
    }
  }
}



export const sessionController = new SessionController();