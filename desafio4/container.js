const  fs = require('fs');
const { randomUUID } = require('crypto')

class ContenedorArchivo {
    #objects
    #route

    constructor(route) {
        this.#route = route
        this.#objects = []
    }

    async save(object) {
        this.#objects.push(object)
        await fs.promises.writeFile(this.#route, JSON.stringify(this.#objects))
    }

    async getById(x) {
        const foundObject = this.#objects.find(object => object.id == x)
        return foundObject         
    }

    async getAll() {
        this.#objects = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
        return this.#objects
    }

    async deleteById(id) {
        this.#objects.splice(id-1, 1);
        await fs.promises.writeFile(this.#route, JSON.stringify(this.#objects))
    }

   async deleteAll() {
        this.#objects.splice(0 , this.#objects.length)
        await fs.promises.writeFile(this.#route, JSON.stringify(this.#objects))
    }
}


async function appTest(){
    const fileRoute = './productos.txt'
    await fs.promises.writeFile(fileRoute, '[]')
    const products = new ContenedorArchivo(fileRoute)

    await products.save({
        id: 1,
        title:'mochila', 
        price:20000, 
        thumbnail:'png1'
    })

    await products.save({
        id: 2,
        title: 'alforja',
        price: 40000,
        thumbnail: 'png2'
    })

    await products.save({
        id: 3,
        title: 'banano',
        price: 10000,
        thumbnail: 'png3'
    })

    await products.save({
        id: 4,
        title: 'billetera',
        price: 5000,
        thumbnail: 'png4'
    })

    await products.getAll();
    await products.getById(3);
    // await products.deleteById(2);
    // await products.deleteAll();
}

appTest();

// module.exports = { appTest };

module.exports = { ContenedorArchivo };