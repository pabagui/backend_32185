import { fork } from "child_process";
import path from "path";
import util from 'util';
import { cpus } from "os";


export function infoObjectProcess(req, res) {

    const  nProcesadores = cpus().length
    const object = {
        NumeroDeProcesadores: nProcesadores,
        ArgumentosDeEntrada: process.argv,
        PathDeEjecucion: process.execPath,
        SistemaOperativo: process.platform, 
        UsoDeMemoria: util.inspect(process.memoryUsage()),
        ProcessId: process.pid,
        VersionDeNodeJs: process.version,
        CarpetaDelProyecto: process.cwd(),
        MemoriaTotalReservadaRSS: util.inspect(process.memoryUsage().rss)
    }
    res.json(object)
  }
  
  
  export function calculateRandoms({ params }, res) {
  
    const numbs = params.number || 100_000;
    const child = fork('./controllers/computoRandom.js');
    child.send({ event: 'limit', limit: numbs });
  
    child.on('message', msg => {
      if (msg.event === 'response') {
        res.json(msg.respuesta);
      } else {
        res.sendStatus(400);
      }
    });
  }