import fs from 'fs/promises'
import { ErrorIdNoEncontrado } from '../errors/errorIdNoEncontrado.js'

export class DaoArchivo {
    #ruta
    #cosas

    constructor(ruta) {
        this.#ruta = ruta
        this.#cosas = []
    }

    async #leer() {
        this.#cosas = JSON.parse(await fs.readFile(this.#ruta, 'utf-8'))
    }
    async #escribir() {
        await fs.writeFile(this.#ruta, JSON.stringify(this.#cosas, null, 2))
    }

    async guardar(dto) {
        await this.#leer()
        this.#cosas.push(dto)
        await this.#escribir()
    }

    async buscarPorId(id) {
        await this.#leer()
        const dto = this.#cosas.find(c => c.id === id)
        if (!dto) throw new ErrorIdNoEncontrado(id)
        return dto
    }

    async actualizar(id, dto) {
        await this.#leer()
        const indice = this.#cosas.findIndex(c => c.id === id)
        if (indice === -1) throw new ErrorIdNoEncontrado(id)
        this.#cosas[indice] = dto
        await this.#escribir()
    }
}