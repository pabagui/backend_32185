// const express = require('express')
// const { Server: HttpServer } = require('http')
// const { Server: IOServer } = require('socket.io')
import express from 'express'
import session from 'express-session';
import MongoStore from 'connect-mongo';


import { createServer } from 'http'
// import { IOServer } from 'socket.io'
import { Server } from 'socket.io'

import { fileURLToPath } from 'url';
import { dirname } from 'path';

// import { productosFaker } from './containers/contenedorFaker.js';

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

//SESIÓN DE USUARIO CON MONGO ATLAS
app.use(session({
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://admin:1234@cluster0.iygr0f4.mongodb.net/test',
    }),
    secret: 'shhhhhhhhhhhhhhhhhhhhh',
    resave: false,
    saveUninitialized: false/* ,
    cookie: {
        maxAge: 40000
    } */

}))



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


/*
app.get('/', (req, res) => {
  res.send('servidor express ok')
})
*/

let contador = 0
app.get('/sin-session', (req, res) => {
    res.send({ contador: ++contador })
})

app.get('/con-session', (req, res) => {
    if (req.session.contador) {
        req.session.contador++
        res.send(`Ud ha visitado el sitio ${req.session.contador} veces.`)
    } else {
        req.session.contador = 1
        res.send('Bienvenido!')
    }
})

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (!err) res.send('Logout ok!')
        else res.send({ status: 'Logout ERROR', body: err })
    })
})

app.get('/info', (req, res) => {
    console.log('------------ req.session -------------')
    console.log(req.session)
    console.log('--------------------------------------')

    console.log('----------- req.sessionID ------------')
    console.log(req.sessionID)
    console.log('--------------------------------------')

    console.log('----------- req.cookies ------------')
    console.log(req.cookies)
    console.log('--------------------------------------')

    console.log('---------- req.sessionStore ----------')
    console.log(req.sessionStore)
    console.log('--------------------------------------')

    res.send('Send info ok!')
})


app.get('/login', (req, res) =>{
  // const hayProductos = productos.length > 0
  // const hayMensajes = mensajes.length > 0
  const bienvenida = 'Bienvenido!'
    res.render('main.hbs', {
      // productos, 
      // mensajes,
      // hayProductos:hayProductos,
      // hayMensajes:hayMensajes,
      bienvenida
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

/*
//normalizr
// import { normalize, denormalize, schema } from "normalizr"
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
*/

  // Definimos un esquema de usuarios (autores)
//   const authorSchema = new schema.Entity('author', {}, { idAttribute: 'email' })
  
  // Definimos un esquema de textos (mensajes)
//   const textSchema = new schema.Entity('texts')
  
  // Definimos un esquema de mensajes totales
//   const messageSchema = new schema.Entity('chats', {
//     author: authorSchema,
//     texts: textSchema
//   });
  
  
  /* ---------------------------------------------------------------------------------------- */
  /*
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

*/

/*
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

*/

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