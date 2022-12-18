// const express = require('express');
// const { routerRoot } = require('./routers/routerRoot');
// const { routerApiProd } = require('./routers/routerApiProd');
// const { routerApiCart } = require('./routers/routerApiCart');

import express from 'express';
import { routerRoot } from './routers/routerRoot.js';
import { routerApiProd } from './routers/routerApiProd.js';
import { routerApiCart } from './routers/routerApiCart.js';

const app = express();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use('/public', express.static('public'))
// app.use(express.static('public')) //la que debiera usar si tuviese html

/*
//para administradores
let isAdmin = false

function onlyForAdmins(req, res, next){
    if(isAdmin) {
        next()
    } else {
        res.sendStatus(403)
    }
}

app.post('/login', (req, res) => {
    isAdmin = true
    res.sendStatus(200)
})

app.post('/logout', (req, res) => {
    isAdmin = false
    res.sendStatus(200)
})

app.get('/publico', (req, res) => {
    res.send('endoint publico')
})

app.post('/privado', onlyForAdmins, (req, res) => {
    res.send('endoint privado')
})
*/

// rutas
app.use('/', routerRoot)
app.use('/api/products', routerApiProd)
app.use('/api/shoppingcart', routerApiCart)

app.all('*', (req, res) => {
    res.status(404).json(/*no implementada*/)
})

const puerto = process.env.PORT ?? 8080
export function connect(puerto) {
            return new Promise((res, rej) => {
        const server = app.listen(puerto, () => {   
        res(server)
        });
        server.on('error', (error) => console.log(error));
        })
        }


// module.exports = { connect }