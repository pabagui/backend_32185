const express = require('express');
const { routerRoot } = require('./routers/routerRoot');
const { routerApiProd } = require('./routers/routerApiProd');
const { routerApiCart } = require('./routers/routerApiCart');

const app = express();

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use('/public', express.static('public'))
// app.use(express.static('public')) //la que debiera usar si tuviese html

// rutas
app.use('/', routerRoot)
app.use('/api/products', routerApiProd)
app.use('/api/shoppingcart', routerApiCart)

app.all('*', (req, res) => {
    res.status(404).json(/*no implementada*/)
})

const puerto = process.env.PORT ?? 8080
function connect(puerto) {
    return new Promise((res, rej) => {
const server = app.listen(puerto, () => {   
    res(server)
});
server.on('error', (error) => console.log(error));
})
}


module.exports = { connect }