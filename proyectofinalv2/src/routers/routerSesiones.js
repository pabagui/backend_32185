import { Router } from 'express'
import passport from 'passport'
import { loginController, logoutController } from '../controllers/controladorUsuarios.js'
// import { sessionController } from '../controllers/controladorSesiones.js'


export const routerApiSessions = new Router()



// routerApiSessions.post('/api/sessions', sessionController.validarUsuario) //agregar controller adminCheck

routerApiSessions.post('/api/sessions/login', passport.authenticate('login', { failWithError: true }), loginController)
routerApiSessions.post('/api/sessions/logout', logoutController)