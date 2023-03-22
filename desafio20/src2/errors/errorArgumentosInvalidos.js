export class ErrorArgumentosInvalidos extends Error {
    constructor(mensaje) {
        super(mensaje)
        this.tipo = 'ARGUMENTO_INVALIDO'
    }
}