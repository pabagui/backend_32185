import { PERSISTENCIA } from "./config/config.js";
import { ContenedorFirestore } from "./contenedorFirebase.js";
import { ContenedorMongoDb } from "./ContenedorMongoDb.js";
import { ContenedorMemoria } from "./contenedorMemoria.js";

let contenedorMaestro

switch (PERSISTENCIA) {
    case 'mongodb': 
        contenedorMaestro = new ContenedorMongoDb('productos')    
        break;
    case 'firestore':
        contenedorMaestro = new ContenedorFirestore('productos')
        break; //puede que sobre y vaya el break después de default
    default:
        contenedorMaestro = new ContenedorMemoria()
        // break;
        break;
}

export { contenedorMaestro }