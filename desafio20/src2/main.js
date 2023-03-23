import express from 'express'
import { PORT } from './config/servidor.js'
import { apiRouter } from './routers/apiRouter.js'
import { pino } from './logger/pino.js'


const app = express()
app.use('/api', apiRouter)

async function main( {
    try {
        const server = app.listen(PORT, () => { console.log(`🔥escuchando en puerto ${PORT}🔥`) })
    } catch (error) {
        console.log(`falla en la app: ${error}`);
    }
})
const server = app.listen(PORT, () => { console.log(`🔥escuchando en puerto ${PORT}🔥`) })

async function main() {
    try {
        const serv = await connect(PORT);
        console.log(`🔥Servidor conectado escuchando en el puerto http://localhost:${serv.address().port}🔥`)
    } catch (error) {
        console.log(`falla en la app: ${error}`);
    }
}

main()