import express from 'express'
import { Router } from 'express'
// import { LogOut } from '../controladores/controladorLog'
import { LogOut } from '../controladores/controladorLog.js'
import { valAuthenticate } from '../../admin/authLogin.js'
import passport from 'passport'
import { logger } from '../../logger/pino.js'

export const routerApiLog = Router()
// export const routerApiLog = express.Router()


routerApiLog.post('/login', (req, res, next) => {
    passport.authenticate('local-login', (err, user, info) => {
      if (err) {
        logger.error(err.message);
        return res.status(400).json({ message: err.message })
      }
      if (!user) {
        return res.status(400).json({ message: 'usuario no encontrado' })
      }
      req.logIn(user, (err) => {
        if (err) {
          logger.error(err.message)
          return res.status(500).json({ message: '500: Internal Server error' })
        }
        return res.json(user)
      });
    })(req, res, next);
  });
  
  routerApiLog.post('/logout', valAuthenticate, LogOut)