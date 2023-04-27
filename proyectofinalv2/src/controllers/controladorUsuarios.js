import { Usuario } from '../models/usuario.js'
import { usuarioService } from '../services/usuariosService.js'
import { logger } from '../../config/logger.js'


export async function postUserController(req, res, next) {
    try {
        const { email, password, name, lastname, image, role} = req.body
        if (!email || !password || !name || !lastname || !image || !role) {
            logger.error(`Datos incompletos de usuario`)
            res.status(401)
            res.json({message: 'Datos incompletos de usuario'})
        } else {
            const result = await usuarioService.buscar(email)
            if (!result) {
                const nuevoUsuario = new Usuario(req.body)
                await usuarioService.guardar(nuevoUsuario.asDto())
                .then(result => {
                    res.json(result)
                })
            } else {
                logger.error(`Usuario ${email} ya registrado`)
                res.status(400);
                res.json({message: `Usuario ${email} ya registrado`})
            }
        }
    } catch (err) {
        logger.error(err)
        res.status(500);
        res.json({message: err})
    }
}

export async function getUserController(req, res, next) {
    try {
        const user = await usuarioService.buscar(req.user.email)
        if (user) {
            res.json(user)
        } else {
            logger.error(`Usuario no registrado ${req.user.email}`)
            res.status(401);
            res.json({message: `Usuario no registrado: ${req.user.email}`});
        }
    } catch (err) {
        logger.error(`Error de registro de usuario: ${err}`)
        res.status(500);
        res.json({mensaje: err})
    }
}

export async function loginController(req, res) {
    const { email } = req.body
    if (!email) {
        res.status(401)
        logger.error(`Login error: sin email de usuario`)
        res.json({message: `Login failed`})
    } else {
        logger.info(`Login correcto: ${email} `)
        res.json(`Login correcto: ${email}`)
    }
}

export async function logoutController(req, res) {
    if(req.user){
        const email = req.user.email
        req.logout(function(err) {
            if (err) { return next(err); }
            logger.info(`Logout correcto: ${email} `)
            res.json(`Logout correcto: ${email}`)
        });
    } else {
        logger.error(`Usuario no autenticado`)
        res.json('Usuario no autenticado')
    }
}

