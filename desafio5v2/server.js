const express = require('express')
const { engine } = require('express-handlebars')
const app = express()
const productos = []

app.use(express.urlencoded({extended: true}))

app.set('views', './views')
app.set('view engine', 'hbs')

app.engine(
    'hbs', 
    engine({
    extname:'.hbs',
    defaultLayout:'index.hbs',
    layoutsDir: __dirname+"/views/layout",
    partialsDir: __dirname+"/views/partials"
  })
)

app.get('/', (req, res) =>{
    res.render('main', {
        rutaFormulario:true,
         rutaProductos:false
    })
})

app.get('/productos', (req, res) =>{
    const hayProductos = productos.length > 0
    res.render('main', {
        rutaProductos:true,
         productos, 
         formulario:false, 
         hayProductos:hayProductos
    })
})

app.post('/productos', (req, res) =>{
    productos.push(req.body)
    res.redirect('/')
})



function connect(PORT = 8080) {
    return new Promise((res, rej) => {
const server = app.listen(PORT, () => {   
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

module.exports = { connect }