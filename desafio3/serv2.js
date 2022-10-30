const express = require('express');
const { ContenedorArchivo } = require('./container.js');

const productos = new ContenedorArchivo('productos.txt');

const app = express();

const PORT = 8080

const random = (number)=> parseInt(Math.random() * number)

const server = app.listen(PORT, () => {
    console.log(`😃 servidor escuchando en el puerto http://localhost:${PORT}`)
    
    app.get('/', (req, res) => {
        res.send('<h1>😃Hola servidor Express para el desafío 3</h1>');
    })
    
    app.get('/productos', async (req, res) => {  
        
        const prods = await productos.getAll();
        console.log(prods);
        res.send(prods);
    })
    app.get('/productoRandom', async (req, res) => {
        const prods = await productos.getAll();
        res.send(prods[random(prods.length)]);
    })
});

server.on('error', (error) => console.log(error));