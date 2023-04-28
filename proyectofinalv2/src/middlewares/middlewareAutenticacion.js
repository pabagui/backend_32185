import { logger } from '../../config/logger.js';
import passport from 'passport';
import express from 'express'

const app = express()
app.use(express.json())
app.use(passport.initialize());
app.use(passport.session());

export async function authenticationMiddleware(req, res, next){
    if(req.isAuthenticated()){
        next();
    } else {
        res.status(500)
        logger.error(`Usuario no autenticado`)
        res.json('Usuario no autenticado')
    }
}

/*
app.get('/some_path',checkAuthentication,function(req,res){
    //do something only if user is authenticated
});
function checkAuthentication(req,res,next){
    if(req.isAuthenticated()){
        //req.isAuthenticated() will return true if user is logged in
        next();
    } else{
        res.redirect("/login");
    }
}
*/