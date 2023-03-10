import express from 'express';
import MongoStore from 'connect-mongo';
import session from 'express-session';
import passport from 'passport';

import { SESSION_SECRET, CNX_sessions } from '../../config/config.js';
import { routerApiProd } from '../routers/routerApiProducts.js';
import { routerApiCarts } from '../routers/routerApiCarts.js';
import { routerApiUser } from '../routers/routerApiUser.js';
import { routerApiLog } from '../routers/routerApiLog.js';
import { valAuthenticate } from '../../admin/authLogin.js';
import { passportConfig } from '../../config/passport.js'
import { notFound } from '../../config/notFound.js';
import { logger } from '../../logger/pino.js';


passportConfig();

export class Server {
  app;
  server;
  constructor() {
    this.app = express();


    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
   

    this.app.use(session({ 
      secret: SESSION_SECRET,
      resave: false, 
      saveUninitialized: false, 
      store: new MongoStore({ mongoUrl: CNX_sessions })
    }))

    this.app.use(passport.initialize())
    this.app.use(passport.session())

  
    this.app.use('/api/products', routerApiProd)
    this.app.use('/api/shoppingcartproducts', valAuthenticate, routerApiCarts)
    this.app.use('/api/', routerApiUser)
    this.app.use('/', routerApiLog)

    this.app.all('*', notFound)
  }

  async connect({ puerto = 0 }) {
    return new Promise((resolve, reject) => {
      this.server = this.app.listen(puerto, () => {
        resolve({ puerto })
      });
      this.server.on('error', error => {
        logger.error(`error de conexión: ${error}`)
        reject(error)
      })

    })
  }

  async disconnect() {
    return new Promise((resolve, reject) => {
      this.server.close(error => {
        if (error) {
          logger.error(`error de conexión: ${error}`)
          reject(error)
        } else {
          resolve(true)
        }
      })
    })
  }
}