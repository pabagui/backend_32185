// const { connect } = require('./server.js');
import  { connect } from './server.js';
import  { port } from './config.js';


async function main() {
    try {
        const serv = await connect(8080);
        console.log(`🔥 Servidor conectado escuchando en el puerto http://localhost:${serv.address().port} 🔥`)
    } catch (error) {
        console.log(`falla en la app: ${error}`);
    }
}

main()
