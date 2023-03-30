import express from 'express'
import { PORT } from './config/servidor.js'
import { apiRouter } from './routers/apiRouter.js'
import { logger } from './logger/pino.js'


const app = express()
app.use('/api', apiRouter)

/*
async function main( {
    try {
        const server = await app.listen(PORT, () => { console.log(`🔥Servidor conectado escuchando en el puerto http://localhost:${server.address().port}🔥`) })
    } catch (error) {
        console.log(`falla en la app: ${error}`);
    })
})
 */   

// const server = app.listen(PORT, () => { console.log(`🔥escuchando en puerto ${PORT}🔥`) })
/*
async function main() {
    try {
        const serv = await connect(PORT);
        console.log(`🔥Servidor conectado escuchando en el puerto http://localhost:${serv.address().port}🔥`)
    } catch (error) {
        console.log(`falla en la app: ${error}`);
    }
}
*/

let server

// const server = app.listen(PORT, () => { console.log(`🔥escuchando en puerto ${PORT}🔥`) })

export function conectar(PORT) {
    return new Promise((resolve, reject) => {
        server = app.listen(PORT, () => {
            console.log(`🔥escuchando en puerto ${PORT}🔥`)
            resolve(true)
        })
    })
}

export function desconectar(PORT) {
    return new Promise((resolve, reject) => {
        server.close(err => {
            // console.log(`desconectado!`)
            resolve(true)
        })
    })
}

main()