// const express = require('express')
// const { Server: HttpServer } = require('http')
// const { Server: IOServer } = require('socket.io')
import express from 'express'
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { SESSION_SECRET } from '../../config.js';
import { randomUUID } from 'crypto';
import util from 'util'
import routerRandoms from '../../routers/routerRandoms.js';
import logger from '../../logger.js';


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
// app.use(express.static('views')) //COMENTADO PARA QUE FUNCIONE PM2

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
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false/* ,
    cookie: {
        maxAge: 40000
    } */
}))

// USO DE PASSPORT

app.use(passport.initialize())

//----sesiones! opcional!
passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((uid, done) => {
  const user = Object.values(users).find(u => u.id === uid)
  done(null, user)
});

app.use(passport.session())
//----fin sesiones! opcional!

const users = {}

app.post('/users', (req, res, next) => {
    const user = req.body
    user.id = randomUUID()
    users[user.username] = user
    res.status(201).json(user)
})

app.get('/users/:username', (req, res, next) => {
    res.json(users[req.params.username])
})

passport.use('local-login', new LocalStrategy(
    {},
    (username, password, done) => {
        const user = users[username]
        if (user?.password !== password) {
            return done(null, false)
        }
        done(null, user)
    })
)

app.post('/sessions',
    passport.authenticate('local-login', { failWithError: true }),
    (req, res) => {
        res.status(201).json({ user: req.user, sessionStart: Date.now() })
    }
)

function soloUsuariosLogueados(req, res, next) {
    if (!req.isAuthenticated()) {
        res.sendStatus(401)
    }
    next()
}

app.get('/sessions', soloUsuariosLogueados, (req, res, next) => {
    res.json(req.user)
})

app.delete('/session', (req, res, next) => {
    req.logout(err => {
        res.sendStatus(200)
    })
})


// FIN USO DE PASSPORT



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
        if (!err) res.send('Hasta luego')
        else res.send({ status: 'Logout ERROR', body: err })
    })
})

/*
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
*/

//logger pino desafío 16
app.get('/info', (req, res) => {
  logger.info('------------ req.session -------------')
  logger.info(req.session)
  logger.info('--------------------------------------')

  logger.info('----------- req.sessionID ------------')
  logger.info(req.sessionID)
  logger.info('--------------------------------------')

  logger.info('----------- req.cookies ------------')
  logger.info(req.cookies)
  logger.info('--------------------------------------')

  logger.info('---------- req.sessionStore ----------')
  logger.info(req.sessionStore)
  logger.info('--------------------------------------')

  res.send('Send info ok!')
})

/*
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
*/

app.get('/login', ({ session }, res) =>{
  session?.user ? res.render('main.hbs') : res.render('mainLogin.hbs')
})

app.post('/login', ({ body, session }, res) =>{
  session.user = body.name
  if ((session.user === 'pablo')) {
    session.admin = true;
    res.status(200);
    res.render('mainLogin.hbs', { user: session.user });
  } else {
    res.render('main.hbs');
  }
})


//desafío 15: número procesadores
import { cpus } from 'os'
const  nProcesadores = cpus().length

//desafio 14: object process


app.get('/info2', (req, res) =>{
    res.send(
        'Número de procesadores : '+ nProcesadores + "\n" +
        'Argumentos de entrada: '+ process.argv + "\n" +
        'Path de ejecución: '+ process.execPath + "\n" +
        'Sistema operativo: '+ process.platform + "\n" + 
        'Uso de la memoria '+ util.inspect(process.memoryUsage()) + "\n" +
        'Process id: '+ process.pid + "\n" +
        'Versión de node.js: '+ process.version + "\n" +
        'Carpeta del proyecto: '+ process.cwd() + "\n" +
        'Memoria total reservada (rss): '+ util.inspect(process.memoryUsage().rss)
        )
    })

    app.use('/api/randoms', routerRandoms)
    


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
import { modeloMaster } from '../../modeloMaestro.js';

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

// export function connect(PORT = 8080) {
export function connect( {PORT}) {
    return new Promise((res, rej) => {
// const server = app.listen(PORT, () => {  
const server = app.listen(PORT, () => {  
    res(server)
});
// server.on('error', (error) => console.log(error)) //desafio16 logger
server.on('error', (error) => logger.error(error))
})
}

// module.exports = { connect }

// CLUSTER DESAFÍO 15

import cluster from 'cluster'
import { MODO, PORT } from '../../config.js'

cluster.schedulingPolicy = cluster.SCHED_RR

if (MODO === 'cluster') {
  if (cluster.isPrimary) {
    cluster.schedulingPolicy = cluster.SCHED_RR

    // console.log('modo de ejecucion: CLUSTER') //desafio 16 logger
    // console.log(`Proceso primario: pid ${process.pid}`) //desafio 16 logger
    logger.info('modo de ejecucion: CLUSTER')
    logger.info(`Proceso primario: pid ${process.pid}`)

    for (let i = 0; i < nProcesadores; i++) {
      cluster.fork();
    }

    cluster.on('exit', worker => {
      // console.log(`Desconexión - pid ${worker.process.pid}`)
      logger.info(`Desconexión - pid ${worker.process.pid}`) //desafio 16 logger
      cluster.fork();
    })
  } else {
    // console.log(`Proceso Secundario - pid ${process.pid}`)
    logger.info(`Proceso Secundario - pid ${process.pid}`)//desafio 16 logger
    await connect({ puerto: PORT })
    // console.log(`🔥Conectado al puerto ${PORT}🔥`)
    logger.info(`🔥Conectado al puerto ${PORT}🔥`) //desafio 16 logger
  }
} else {
  await connect({ puerto: PORT })
  // console.log(`🔥Conectado al puerto ${PORT}🔥`)
  logger.info(`🔥Conectado al puerto ${PORT}🔥`) //desafio 16 logger
}

//server con PM2
app.get('/datos', (req, res) => {
    // console.log(`port: ${PORT} -> Fyh: ${Date.now()}`)
    logger.info(`port: ${PORT} -> Fyh: ${Date.now()}`) //desafio 16 logger
    res.send(`Servidor express <span>(Nginx)</span> en ${PORT} -
    <b>PID ${process.id}</b> - ${new Date().toLocaleString()}`)
})


//desafío 16 gzip
import compression from 'compression';

app.get('/info2zip', compression(), (req, res) =>{
    res.send(
        'Número de procesadores : '+ nProcesadores + "\n" +
        'Argumentos de entrada: '+ process.argv + "\n" +
        'Path de ejecución: '+ process.execPath + "\n" +
        'Sistema operativo: '+ process.platform + "\n" + 
        'Uso de la memoria '+ util.inspect(process.memoryUsage()) + "\n" +
        'Process id: '+ process.pid + "\n" +
        'Versión de node.js: '+ process.version + "\n" +
        'Carpeta del proyecto: '+ process.cwd() + "\n" +
        'Memoria total reservada (rss): '+ util.inspect(process.memoryUsage().rss)
        )
    })


//desafio 16 artilley

function isPrime(num) {
  if ([2, 3].includes(num)) return true;
  else if ([2, 3].some(n => num % n == 0)) return false;
  else {
      let i = 5, w = 2;
      while ((i ** 2) <= num) {
          if (num % i == 0) return false
          i += w
          w = 6 - w
      }
  }
  return true
}

app.get('/profiling', (req, res) => {
  const primes = []
  const max = Number(req.query.max) || 1000
  for (let i = 1; i <= max; i++) {
      if (isPrime(i)) primes.push(i)
  }
  res.json(primes)
})



app.all('*', (req, res) => {
  const { url, method } = req
  logger.warn(`Ruta ${method} ${url} no implementada`)
  res.send(`Ruta ${method} ${url} no está implementada`)
})

app.listen(PORT, err => {
    if (!err)  logger.info(`🔥Servidor express escuchando el puerto ${PORT} - PID WORKER ${process.id}🔥`) //desafio 16 logger
    // console.log(`🔥Servidor express escuchando el puerto ${PORT} - PID WORKER ${process.id}🔥`)
})