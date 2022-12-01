const { connect } = require('./server.js');

const puerto = process.env.PORT ?? 8080
async function main() {
    try {
        const serv = await connect(puerto);
        console.log(`🔥Servidor conectado escuchando en el puerto http://localhost:${serv.address().port}🔥`)
    } catch (error) {
        console.log(`falla en la app: ${error}`);
    }
}

main()