// const { connect } = require('./server.js');
import { connect } from './server.js';
// const puerto = process.env.PORT ?? 8080
import { PORT } from '../config/config.js';

/*
async function main() {
    try {
        const serv = await connect(puerto);
        console.log(`🔥Servidor conectado escuchando en el puerto http://localhost:${serv.address().port}🔥`)
    } catch (error) {
        console.log(`falla en la app: ${error}`);
    }
}
*/

async function main() {
    try {
        const serv = await connect(PORT);
        console.log(`🔥Servidor conectado escuchando en el puerto http://localhost:${serv.address().port}🔥`)
    } catch (error) {
        console.log(`falla en la app: ${error}`);
    }
}

main()