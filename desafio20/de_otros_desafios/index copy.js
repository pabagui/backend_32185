// const { connect } = require('./server.js');
// import  { connect } from './server.js';
import  { connect } from '../src/server.js';
import  { PORT, MODO } from '../src/config/config.js';
import cluster from 'cluster';


// CLUSTER DESAFÍO 15

import cluster from 'cluster'
import { MODO, PORT } from '../src/config/config.js'

cluster.schedulingPolicy = cluster.SCHED_RR

if (MODO === 'cluster') {
  if (cluster.isPrimary) {
    cluster.schedulingPolicy = cluster.SCHED_RR

    // console.log('modo de ejecucion: CLUSTER') //desafio 16 logger
    // console.log(`Proceso primario: pid ${process.pid}`) //desafio 16 logger
    logger.info('modo de ejecucion: CLUSTER')
    logger.info(`Proceso primario: pid ${process.pid}`)

    for (let i = 0; i < nProcesadores; i++) {
      cluster.fork();
    }

    cluster.on('exit', worker => {
      // console.log(`Desconexión - pid ${worker.process.pid}`)
      logger.info(`Desconexión - pid ${worker.process.pid}`) //desafio 16 logger
      cluster.fork();
    })
  } else {
    // console.log(`Proceso Secundario - pid ${process.pid}`)
    logger.info(`Proceso Secundario - pid ${process.pid}`)//desafio 16 logger
    await connect({ puerto: PORT })
    // console.log(`🔥Conectado al puerto ${PORT}🔥`)
    logger.info(`🔥Conectado al puerto ${PORT}🔥`) //desafio 16 logger
  }
} else {
  await connect({ puerto: PORT })
  // console.log(`🔥Conectado al puerto ${PORT}🔥`)
  logger.info(`🔥Conectado al puerto ${PORT}🔥`) //desafio 16 logger
}


async function main() {
    try {
        const serv = await connect(PORT);
        console.log(`🔥 Servidor conectado escuchando en el puerto http://localhost:${serv.address().port} 🔥`)
    } catch (error) {
        console.log(`falla en la app: ${error}`);
    }
}

main()
