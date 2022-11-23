const express = require('express')
const { Server: HttpServer } = require('http')
const { Server: IOServer } = require('socket.io')

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)

const { engine } = require('express-handlebars')

app.use(express.urlencoded({extended: true}))
app.use(express.static('views'))

const mensajes = []
const productos = []

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


function connect(PORT = 8080) {
    return new Promise((res, rej) => {
// const server = app.listen(PORT, () => {  
const server = httpServer.listen(PORT, () => {  
    res(server)
});
server.on('error', (error) => console.log(error));
})
}

module.exports = { connect }