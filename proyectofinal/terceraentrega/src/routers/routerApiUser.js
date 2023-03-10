import express from 'express'
import { Router } from 'express'
import passport from 'passport'
import { logger } from '../../logger/pino'
// import { userInfo } from '../controladores/controladorUsuarios'
// import { valAuthenticate } from '../../admin/authLogin.js'

export const routerApiUser = Router();
// export const routerApiUser = express.Router();

routerApiUser.post('/users', (req, res, next) => {
  passport.authenticate('local-signup', (err, user, info) => {
    if (err) {
      logger.error(err.message)
      return res.status(400).json({ message: err.message });
    }
    if (!user) {
      return res.status(400).json({ message: 'usuario no encontrado' })
    }
    req.logIn(user, (err) => {
      if (err) {
        logger.error(err.message)
        return res.status(500).json({ message: '500: Internal Server Error' })
      }
      return res.json(user)
    })
  })(req, res, next)
});
