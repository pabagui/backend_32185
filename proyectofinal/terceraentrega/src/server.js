// const express = require('express');
// const { routerRoot } = require('./routers/routerRoot');
// const { routerApiProd } = require('./routers/routerApiProd');
// const { routerApiCart } = require('./routers/routerApiCart');

import express from 'express';
import { routerRoot } from './routers/routerRoot.js';
import { routerApiProd } from './routers/routerApiProd.js';
import { routerApiCart } from './routers/routerApiCart.js';
import { PORT } from '../config/config.js'
import { logger } from '../logger/pino.js';

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

//conexión a base externa: traer
import { modeloMaster } from './modeloMaestro.js';

async function controllerPostProducts(req, res) {
    const datosProducto = req.body
    try {
        const producto = await modeloMaster.createProduct(datosProducto)
        res.json(producto)
    } catch (error) {
        res.json({ errorMsg: error.message })
    }
}

async function controllerGetProducts(req, res) {
    const productos = await modeloMaster.searchProduct()
    res.json(productos)
}


async function agregarProdACarrito(idProd, idCarrito) {
    const carrito = await contenedorCarrito.obtenerPorId(idCarrito) //definir contenedor
    const producto = await contenedorProducto.obtenerPorId(idProd) //definir contenedor
    carrito.productos.push(producto)
    await contenedorCarrito.reemplazarPorId(carrito)
    return carrito
}


async function controllerPostNewCart(req, res, next) {
    try {
        const { idProd } = req.body
        const { idCarrito } = req.params
        const carritoActualizado = await agregarProdACarrito(idProd, idCarrito)
        res.json(carritoActualizado)
    } catch (error) {
        next(error)
    }
}

// app.post('/productos', controladorPost)
// app.get('/productos', controladorGet)

app.post('/api/products', controllerPostProducts)
app.get('/api/products', controllerGetProducts)
app.post('/api/shoppingcart', controllerPostNewCart)
// app.get('/api/shoppingcart', controllerGetProductsInCart)


// rutas
app.use('/', routerRoot)
// app.use('/api/products', routerApiProd)
// app.use('/api/shoppingcart', routerApiCart)

app.all('*', (req, res) => {
    res.status(404).json(/*no implementada*/)
})

/*
const puerto = process.env.PORT ?? 8080
export function connect(puerto) {
            return new Promise((res, rej) => {
        const server = app.listen(puerto, () => {   
        res(server)
        });
        server.on('error', (error) => console.log(error));
        })
        }

*/  
        export function connect(PORT) {
                    return new Promise((res, rej) => {
                const server = app.listen(PORT, () => {   
                res(server)
                });
                server.on('error', (error) => console.log(error));
                })
                }
        
        
// module.exports = { connect }