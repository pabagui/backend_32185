import { Router } from "express";
import compression from "compression";
import logger from "../services/logger.js";
import { infoObjectProcess, calculateRandoms } from "../controllers/controllers.js";

function loggMid(req, res, next) {
    logger.info(`Ruta: ${req.url}, método: ${req.method}`);
    next();
  }
  
  export const router = Router();
  router.get('/', loggMid, (req, res, next) => {
    res.send(`[pid: ${process.pid}] Proceso OK`);
  });
  router.get('/prueba', loggMid, (req, res, next) => {
    res.json({ mensaje: 101 });
  });
  
  // DESAFIO 14
  router.get('/info', loggMid, infoObjectProcess);
  router.get('/randoms/:number?', loggMid, calculateRandoms);
  router.get('/randomsComputo/:number?', compression(), calculateRandoms);
  // el simbolo de pregunta despues de :number '?' hace que el parametro sea opcional
  // por lo tanto puede o no usarse, y en el controlador defini que si no se encuentra
  //el parametro, se utilice el numero 100.000 por defecto!!
  
  router.all('*', (req, res) => {
    logger.warn(`WARN -- Ruta  ${req.url} no implementada, método: ${req.method}`)
    logger.error('FATAL ERROR')
    res.status(404)
    res.json({ error: 'ruta no implementada' })
  })