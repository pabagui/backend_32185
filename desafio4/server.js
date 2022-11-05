
const express = require('express');
const { routerWeb } = require('./routers/routerWeb')
const { routerApi } = require('./routers/routerApi')

const app = express();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use('/public', express.static('public'))
app.use(express.static('public'))

// rutas
app.use('/', routerWeb)
app.use('/api/productos', routerApi)


function connect(PORT = 8080) {
    return new Promise((res, rej) => {
const server = app.listen(PORT, () => {   
    res(server)
});
server.on('error', (error) => console.log(error));
})
}


module.exports = { connect }
