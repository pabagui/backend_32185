const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const { engine } = require('express-handlebars')

const productos = []
const mensajes = []

app.use(express.urlencoded({extended: true}))
// app.use(express.static('./public'))
// app.use(express.static('./views/layout'))
app.use(express.static('./views'))


app.set('views', './views')
app.set('view engine', 'hbs')

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

app.get('/', (req, res) =>{
    res.render('main', {
        rutaFormulario:true,
        rutaProductos:false,
        mensajes
    })
})

app.get('/productos', (req, res) =>{
    const hayProductos = productos.length > 0
    res.render('main', {
        rutaProductos:true,
        productos, 
        mensajes,
        formulario:false, 
        hayProductos:hayProductos
    })
})

app.post('/productos', (req, res) =>{
    productos.push(req.body)
    res.redirect('/')
})

io.on('connection', (socket) => {
    // console.log('usuario conectado 1ro')
    socket.emit('mensajesActualizados', mensajes)

    socket.on('nuevoMensaje', mensaje => {
        mensaje.date = new Date().toLocaleString()
        mensajes.push(mensaje)
        io.sockets.emit('mensajesActualizados', mensajes)
    })
})





function connect(PORT = 8080) {
    return new Promise((res, rej) => {
// const server = app.listen(PORT, () => {  
const server = httpServer.listen(PORT, () => {  
    res(server)
});
server.on('error', (error) => console.log(error));
})
}

/*
const PORT = 8080;
const server = app.listen(PORT, () =>
  console.log(`🚀 Servidor escuchando el puerto http://localhost:${PORT}`),
);
server.on("error", (err) => console.log(err));
*/

/*
io.on('connection', (socket) => {
    console.log('usuario conectado 2do')
    socket.emit('mi mensaje', 'este es mi mensaje desde el servidor')
})
*/

module.exports = { connect }