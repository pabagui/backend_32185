import express from 'express'
import { PORT } from './config/servidor.js'
import { apiRouter } from './routers/apiRouter.js'

const app = express()
app.use('/api', apiRouter)

const server = app.listen(PORT, () => { console.log(`🔥escuchando en puerto ${PORT}🔥`) })