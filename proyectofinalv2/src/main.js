import express from 'express'

import { routerApiProducts } from './routers/routerProductos.js'
import { routerApiImages } from './routers/routerImagen.js'
import { routerApiCarts } from './routers/routerCarritos.js'
import { routerApiUsers } from './routers/routerUsuarios.js'

const app = express()


/* Middlewares */

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/uploads', express.static('uploads'))
app.use(express.static('uploads'))


/* Rutas */

app.get('/', (req, res) => {
        res.send('<h1>😃Hola servidor Express para el desafío 5</h1>');
})


app.use('/', routerApiProducts)
app.use('/', routerApiCarts)
app.use('/', routerApiUsers)




app.use('/', routerApiImages)
app.use('/api/images', express.static('uploads'))



app.all('*', (req, res) => {
  res.status(404).json('ruta no implementada')
})




/* Server Listen */

const PORT = 8080
const server = app.listen(PORT, () => {
  console.log(`🔥Servidor escuchando en el puerto ${server.address().port}🔥`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))