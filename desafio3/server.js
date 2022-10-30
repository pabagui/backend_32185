

//const { appTest } = require('./container.js');
const express = require('express');
const { ContenedorArchivo } = require('./container.js');
const  fs = require('fs');
const app = express();

const productos = new ContenedorArchivo('productos.txt') 


const random = (number)=> parseInt(Math.random() * number)

function connect(PORT = 8081) {
    return new Promise((res, rej) => {
const server = app.listen(PORT, () => {
    
    res(server)

    app.get('/', (req, res) => {
        res.send('<h1>😃Hola servidor Express para el desafío 3</h1>');
    })
    
    app.get('/productos', async (req, res) => {  
        
        const prods = await productos.getAll();
        res.send(prods);
    })

    app.get('/productoRandom', async (req, res) => {
        const prods = await productos.getAll();
        res.send(prods[random(prods.length)]);
    })
});

server.on('error', (error) => console.log(error));

})
}


/*
const random = (number)=> parseInt(Math.random() * number)

app.get('/', (req, res) => {
    res.send('Desafío 3')
})

app.get('/productos', (req, res) => {
    res.send(productos.getAll())
})

app.get('/productoRandom', (req, res) => {
    const prods = productos.getAll()
    res.send(prods[random(prods.length)]);
})


function connect(PORT = 8081) {
    return new Promise((res, rej) => {
        const server = app.listen(PORT, () => {
            res(server)
        })
        server.on('error', error => rej(error))
    })
}

*/

//const PORT = 8081

module.exports = { connect }
