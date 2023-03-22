export class ErrorIdNoEncontrado extends Error {
    constructor(id) {
        super(`prod con id ${id} no encontrado`)
        this.tipo = 'ID_NO_ENCONTRADO'
    }
}