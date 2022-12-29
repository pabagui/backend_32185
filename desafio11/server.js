// const express = require('express')
// const { Server: HttpServer } = require('http')
// const { Server: IOServer } = require('socket.io')
import express from 'express'


import { createServer } from 'http'
// import { IOServer } from 'socket.io'
import { Server } from 'socket.io'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { productosFaker } from './containers/contenedorFaker.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express()
// const httpServer = new HttpServer(app)
const httpServer = createServer(app)
// const io = new IOServer(httpServer)
const io = new Server(httpServer)


// const { engine } = require('express-handlebars')
import { engine } from 'express-handlebars'

app.use(express.urlencoded({extended: true}))
app.use(express.static('views'))

const mensajes = []
const productos = []

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.engine(
    'hbs', 
    engine({
    extname:'.hbs',
    defaultLayout:'index.hbs',
    // defaultLayout:'index.html',
    layoutsDir: __dirname+"/views/layout",
    partialsDir: __dirname+"/views/partials"
  })
)


// app.use('/api/products', routerApiProducts)
// app.use('/api/messages', routerApiMessages)



app.get('/', (req, res) =>{
    const hayProductos = productos.length > 0
    const hayMensajes = mensajes.length > 0
    res.render('main.hbs', {
        // rutaFormulario:true,
        // rutaProductos:false,
        // mensajes
        // rutaProductos:true,
        productos, 
        mensajes,
        // formulario, 
        // chat, 
        hayProductos:hayProductos,
        hayMensajes:hayMensajes
    })
})


app.post('/', (req, res) =>{
    productos.push(req.body)
    // mensajes.push(req.body)
    res.redirect('/')
})

app.get('/api/productos-test', (req, res) => {
    const hayProductos = productos.length > 0
    const hayMensajes = mensajes.length > 0
    const prodsFaker = productosFaker.getAll()
    res.render('main.hbs', {
        // rutaFormulario:true,
        // rutaProductos:false,
        // mensajes
        // rutaProductos:true,
        productos, 
        mensajes,
        // formulario, 
        // chat, 
        hayProductos:hayProductos,
        hayMensajes:hayMensajes,
        prodsFaker

        
    })
})

//conexión a base externa MONGODB / NORMALIZR
import { modeloMaster } from './modeloMaestro.js';

async function controllerPostMessages(req, res) {
    const datosMensaje = req.body
    try {
        const mensaje = await modeloMaster.createMessage(datosMensaje)
        res.json(mensaje)
    } catch (error) {
        res.json({ errorMsg: error.message })
    }
}

async function controllerGetMessages(req, res) {
    const mensajes = await modeloMaster.searchMessage()
    res.json(mensajes)
}



// app.post('/productos', controladorPost)
// app.get('/productos', controladorGet)

app.post('/', controllerPostMessages)
app.get('/', controllerGetMessages)


//normalizr
import { normalize, denormalize, schema } from "normalizr"
const messages = {
    author: {
      email: "mail del usuario",
      nombre: "nombre del usuario",
      apellido: "apellido del usuario",
      edad: "edad del usuario",
      alias: "alias del usuario",
      avatar: "url avatar (foto, logo) del usuario"
    },
    text: "mensaje del usuario"
  }
  
  // Definimos un esquema de usuarios (autores)
  const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' })
  
  // Definimos un esquema de textos (mensajes)
//   const textSchema = new schema.Entity('texts')
  
  // Definimos un esquema de mensajes totales
//   const messageSchema = new schema.Entity('chats', {
//     author: authorSchema,
//     texts: textSchema
//   });
  
  
  /* ---------------------------------------------------------------------------------------- */
  import util from 'util'
  
  function print(object) {
    console.log(util.inspect(object, false, 12, true))
  }
  
  console.log(' ------------- OBJETO ORIGINAL --------------- ')
  print(messages)
  console.log(JSON.stringify(messages).length)
  
  
  console.log(' ------------- OBJETO NORMALIZADO --------------- ')
  const normalizedMessages = normalize(messages, authorSchema);
  print(normalizedMessages)
  console.log(JSON.stringify(normalizedMessages).length)
  
  console.log(' ------------- OBJETO DENORMALIZADO --------------- ')
  const denormalizedMessages = denormalize(normalizedMessages.result, authorSchema, normalizedMessages.entities);
  print(denormalizedMessages)
  console.log(JSON.stringify(denormalizedMessages).length)


  //socket chat
io.on('connection', (socket) => {

    socket.emit('mensajesActualizados', mensajes)

    socket.on('nuevoMensaje', mensaje => {
        mensaje.fecha = new Date().toLocaleString()
        mensajes.push(mensaje)
        io.sockets.emit('mensajesActualizados', mensajes)
    })

    socket.emit('productosActualizados', productos)

    socket.on('nuevoProducto', producto => {
        productos.push(producto)
        io.sockets.emit('productosActualizados', productos)
    })
})


export function connect(PORT = 8080) {
        return new Promise((res, rej) => {
    // const server = app.listen(PORT, () => {  
    const server = app.listen(PORT, () => {  
        res(server)
    });
    server.on('error', (error) => console.log(error));
    })
    }

// module.exports = { connect }