
const express = require('express');
const { ContenedorArchivo } = require('./container.js');
const app = express();
const { engine } = require('express-handlebars'); 

const productos = []

app.engine(
    'hbs',
    engine({
        extname: '.hbs',
        defaultLayout: 'index.hbs',
        layoutsDir: __dirname + '/views/layouts',
        partialsDir: __dirname + '/views/partials'
    })
);

app.set('view engine', 'hbs');
app.set('views', './views');
app.use(express.static('public'));


// const productos = new ContenedorArchivo('productos.txt') 
 

// const random = (number)=> parseInt(Math.random() * number)


app.get('/', (req, res) => {
    res.send('<h1>😃Hola servidor Express para el desafío 5</h1>');
})

// app.get('/productos', async (req, res) => { 
app.get('/productos', (req, res) => {  
    
    // const prods = await productos.getAll();
    // res.send(prods);
    // res.render('main', {suggestedChamps: prods, listExists: true })
    res.render('productos', { productos, productosCharged: productos.length > 0 })
})

app.post('/productos', async (req, res) => {  
    
    await productos.push(req.body);
    console.log(productos);
    // res.send(productos);
    res.redirect('/')
})

/*
app.get('/productoRandom', async (req, res) => {
    const prods = await productos.getAll();
    res.send(prods[random(prods.length)]);
})
*/


function connect(PORT = 8080) {
    return new Promise((res, rej) => {
const server = app.listen(PORT, () => {   
    res(server)
});
server.on('error', (error) => console.log(error));
})
}


module.exports = { connect }
