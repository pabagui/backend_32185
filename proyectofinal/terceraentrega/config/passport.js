import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { contenedorUsuarios } from '../maestros/contenedorMaestro.js'; 
import { createUser, findEmail } from '../maestros/usuarioMaestro.js'; 
import { checkPassword } from '../admin/security.js'
import { sendEmail } from './nodeMailer.js';
import { logger } from '../logger/pino.js'; 


export function passportConfig() {
 
  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

 
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await user.getById(id)
      return done(null, user)
    } catch (err) {
      return done(err)
    }
  })


  passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async (req, email, password, done) => {
    try {
      if (await findEmail(email)) throw new Error('usuario ya registrado')
      const user = await createAccount(req.body)
      if (!user) throw new Error('error al crear usuario')
      const { name, lastname, image, idCart, id } = req.body
      const message = {
        from: '<admin@admin>',
        to: '<admin@admin>',
        subject: 'Nuevo usuario',
        text: `Registro nuevo
              Nombre: ${name}
              Apellido: ${lastname}
              Email: ${email}
              Password: ${user.password}
              Foto: ${image}
              Id de usuario: ${user.id}
              Id de carrito: ${user.idCart}
              `,
        html: `<h2>Nuevo usuario</h2>
                <ul>
                  <li>Nombre: ${name}</li>
                  <li>Apellido: ${lastname}</li>
                  <li>Email: ${email}</li>
                  <li>Password: ${user.password}</li>
                  <li>Foto: ${image}</li>
                  <li>Id de usuario: ${user.id}</li>
                  <li>Id de carrito: ${user.idCart}</li>
                </ul>`
      }

      sendEmail.send(message)
      done(null, user)
    } catch (err) {
      logger.error(err.message)
      return done(err)
    }
  }))


  passport.use('local-login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, async ({ body }, email, password, done) => {
    try {
      const user = await findEmail(email)
      if (!user || !checkPassword(body)) {
        return done(null, false);
      }

      return done(null, user)
    } catch (err) {
      logger.error(err.message)
      return done(err)
    }
  }))
}