import { contenedorMaestro } from "./contenedorMaestro.js";

class ModelMaster {

    constructor() {
        this.contenedor = contenedorMaestro
    }

    async createMessage(datos) {
        const message = await this.contenedor.save(datos)
        return message
    }

    async searchMessage() {
        return await this.contenedor.getSomething()
    }
}

export const modeloMaster = new ModelMaster()
