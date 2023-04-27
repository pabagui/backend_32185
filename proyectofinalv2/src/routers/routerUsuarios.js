import { Router } from 'express';
import { postUserController, getUserController, loginController, logoutController } from '../controllers/controladorUsuarios.js'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'
import { desencriptador } from '../jwt/jwt.js';
import { logger } from '../../config/logger.js';
import { authenticationMiddleware } from '../middlewares/middlewareAutenticacion.js'


passport.use('login', new LocalStrategy(
    {},
    (username, password, done) => {
        MongoClient.connect(urlMongoAtlas, { useNewUrlParser: true }, (err, client) => {
            const db = client.db("coderhouse");
            const collection = db.collection("users");
            if (err) logger.error("error de conexión a la base de datos");
            return collection.findOne({"username": username}, {"username":1, "password":1})
            .then(user => {
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
        });
    })
)




export const routerApiUsers = new Router()

routerApiUsers.post('/api/users', postUserController);
routerApiUsers.get('/api/users', authenticationMiddleware, getUserController)
routerApiUsers.post('/api/login', passport.authenticate('login', { failWithError: true }), loginController)
routerApiUsers.post('/api/logout', logoutController)
