const  fs = require('fs');

class ContenedorArchivo {
    #elements
    #route

    constructor(route) {
        this.#route = route
        this.#elements = []
    }

    async save(element) {
        this.#elements.push(element)
        await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements))
    }

    async getById(x) {
        const foundElement = this.#elements.find(element => element.id == x)
        return foundElement         
    }

    async getAll() {
        this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
        return this.#elements
        // return this.#elements.map(e => e, [])
    }

    async deleteById(id) {
        this.#elements.splice(id-1, 1);
        await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements))
    }

   async deleteAll() {
        this.#elements.splice(0 , this.#elements.length)
        await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements))
    }
}


async function appTest(){
    const fileRoute = './productos.txt'
    await fs.promises.writeFile(fileRoute, '[]')
    const products = new ContenedorArchivo(fileRoute)

    await products.save({
        name:'mochila',  
        description:'negra',
        image:'png1',
        price:20000
    })

    await products.save({
        name:'alforja',  
        description:'roja',
        image:'png2',
        price:20000
    })

    await products.save({
        name:'banano',  
        description:'amarillo',
        image:'png3',
        price:20000
    })

    await products.save({
        name:'billetera',  
        description:'azul',
        image:'png4',
        price:20000
    })

    await products.getAll();
    await products.getById(3);
    // await products.deleteById(2);
    // await products.deleteAll();
}

// appTest();

// module.exports = { appTest };

module.exports = { ContenedorArchivo };