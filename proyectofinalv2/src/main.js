import express from 'express'
import dotenv from 'dotenv'
import { routerApiProducts } from './routers/routerProductos.js'
import { routerApiImages } from './routers/routerImagen.js'
import { routerApiCarts } from './routers/routerCarritos.js'
import { routerApiUsers } from './routers/routerUsuarios.js'
import { routerApiOrders } from './routers/routerOrdenes.js'
import {routerApiSessions } from './routers/routerSesiones.js'

import session from 'express-session'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import MongoStore from 'connect-mongo'
import { MongoClient } from 'mongodb'
// import { SESSION_SECRET, CNX_STR} from '../config/config.js';
import { PORT, SESSION_SECRET, CNX_STR_MONGOATLAS } from '../config/config.js';
import { desencriptador } from './jwt/jwt.js';
import { buscar } from './daos/mongodbDao.js';

dotenv.config()

const app = express()


/* Middlewares */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))
app.use(express.static('uploads'))






/*Session*/

app.use(session({
  store: MongoStore.create({
      // mongoUrl: CNX_STR,
      mongoUrl: CNX_STR_MONGOATLAS,
  }),
  secret: SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: {
      maxAge: 600000 //1 minuto
  }
}))

app.use(passport.initialize())

passport.serializeUser((user, done) => {
  done(null, user.email);
});

passport.deserializeUser((email, done) => {
  // MongoClient.connect(CNX_STR, { useNewUrlParser: true }, (err, client) => {
  MongoClient.connect(CNX_STR_MONGOATLAS, { useNewUrlParser: true }, (err, client) => {  
      const db = client.db("coderhouse");
      const collection = db.collection("users");
      if (err) console.log("Error de conexión con base MongoDB");
      return collection.findOne({"email": email}, {"_id":1, "email":1, "password":1, "name":1, "lastname":1, "image":1, "rol":1})
      .then(result => {
          const user = result
          done(null, user)
      })
  });
});

app.use(passport.session())

passport.use('login', new LocalStrategy(
  {usernameField:"email", passwordField:"password"},
  async (username, password, done) => {
          await buscar('users')
          .then(result => {
              const user = result.find(r => r.email === username)
              if (user) {
                  const passOriginal = desencriptador(user.password)
                  if (passOriginal !== password) {
                      done(null, false)
                  }
                  done(null, user)
              } else {
                  done(null, false)
              }
          })
      }
  )
)


/* Rutas */

// app.get('/', (req, res) => {
//         res.send('<h1>😃Hola servidor Express para el desafío 5</h1>');
// })



app.use('/', routerApiProducts)
app.use('/', routerApiCarts)
app.use('/', routerApiUsers)
app.use('/', routerApiOrders)
app.use('/', routerApiSessions)
app.use('/', routerApiImages)
app.use('/api/images', express.static('uploads'))
app.all('*', (req, res) => {
  res.status(404).json('ruta no implementada')
})




/* Server Listen */

// const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`🔥Servidor escuchando en el puerto ${server.address().port}🔥`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))