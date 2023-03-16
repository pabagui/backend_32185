import { PERSISTENCIA } from "../config/config.js";
// import { ContenedorFirestore } from "./contenedorFirebase.js";
import { ContenedorMongoDb } from "./ContenedorMongoDb.js";
// import { ContenedorMemoria } from "./contenedorMemoria.js";

let contenedorMaestro = new ContenedorMongoDb('mensajes') 

/*
switch (PERSISTENCIA) {
    case 'mongodb': 
        contenedorMaestro = new ContenedorMongoDb('mensajes')    
        break;
    case 'firestore':
        contenedorMaestro = new ContenedorFirestore('mensajes')
        break; //puede que sobre y vaya el break después de default
    default:
        contenedorMaestro = new ContenedorMemoria()
        // break;
        break;
}
*/
export { contenedorMaestro }