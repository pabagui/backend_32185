import { contenedorMaestro } from "./contenedorMaestro.js";

class ModelMaster {

    constructor() {
        this.contenedor = contenedorMaestro
    }

    async createProduct(datos) {
        const product = await this.contenedor.save(datos)
        return product
    }

    async searchProduct() {
        return await this.contenedor.getSomething()
    }
}

export const modeloMaster = new ModelMaster()
