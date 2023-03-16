import express from 'express';
import { router } from '../routers/router.js';
import logger from '../services/logger.js';


export default class Servidor {
  #app
  #server
  constructor() {
    this.#app = express()
    this.#app.use('/api', router)
  }
  async connect({ puerto = 0 }) {
    return new Promise((resolve, reject) => {
      this.#server = this.#app.listen(puerto, () => {
        resolve({ puerto })
      });
      this.#server.on('error', error => {
        logger.error(`Error de conexión: ${error}`)
        reject(error)
      });
    });
  }

  async disconnect() {
    return new Promise((resolve, reject) => {
      this.#server.close(error => {
        if (error) {
          logger.error(`Error de conexión: ${error}`)
          reject(error)
        } else {
          resolve(true)
        }
      })
    })
  }
}