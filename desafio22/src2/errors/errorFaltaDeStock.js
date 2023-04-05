export class ErrorFaltaDeStock extends Error {
    constructor(id) {
        super(`no hay stock suiciente para el prod ${id}`)
        this.tipo = 'FALTA_DE_STOCK'
    }
}