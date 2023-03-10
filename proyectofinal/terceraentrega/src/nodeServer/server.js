import express from 'express';
import { MODO, PORT } from '../../config/config.js'
import { logger } from '../../logger/pino.js';
import { Server } from './serverConstructor.js';
import cluster from 'cluster';
import { cpus } from 'os';


const server = function createServer() {
    return new Server()
}


cluster.schedulingPolicy = cluster.SCHED_RR

if (MODO === 'cluster') {
  const cantCpus = cpus().length
  if (cluster.isPrimary) {
    logger.info('modo de ejecución: CLUSTER')
    logger.info(`proceso primario: pid ${process.pid}`)

    for (let i = 0; i < cantCpus; i++) {
      cluster.fork()
    }

    cluster.on('exit', (worker) => {
      logger.info(`eliminar cluster (pid: ${worker.process.pid})`)
      cluster.fork()
    })
  } else {
    await server.connect({ puerto: PORT })
    logger.info(`proceso secundario: pid ${process.pid} conectado al puerto ${PORT} `)
  }
} else {
  await server.connect({ puerto: PORT })
  logger.info(`🔥Servidor conectado escuchando en el puerto http://localhost: ${PORT}🔥`)
}






/*
export function connect(PORT) {
            return new Promise((res, rej) => {
        const server = app.listen(PORT, () => {   
        res(server)
        });
        server.on('error', (error) => logger.info(error));
        })
        }

*/
