import { logger } from '../../config/logger.js';



export async function authenticationMiddleware(req,res,next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(500)
        logger.error(`Authentication error: usuario no autenticado`)
        res.json('Usuario no autenticado')
    }
}