const  fs = require('fs');

class ContenedorCarrito {
    #cart
    #route

    constructor(route) {
        this.#route = route
        // this.#carts = []
        this.#cart = {}
        
    }

    async saveCart(id_cart) {
        this.#cart.id_cart = id_cart
        this.#cart.productos = []
        // this.#carts.products.push()
        await fs.promises.writeFile(this.#route, JSON.stringify(this.#cart))
    }


    // async postProducts(id_cart, products) {
    //     this.#cart = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
    //     if(this.#cart.id_cart === id_cart){
    //         this.#cart.products.push(products)
    //         await fs.promises.writeFile(this.#route, JSON.stringify(this.#cart))
    //         return products
    //     } else {
    //         return null
    //     }    
    // }

    
    async postProducts(id_cart, prods) {
        this.#cart = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
        if(this.#cart.id_cart === id_cart){
            this.#cart.productos.push(prods)
            await fs.promises.writeFile(this.#route, JSON.stringify(this.#cart))
            return products
        } else {
            return null
        }    
    }


    async getProds(id_cart) {
        this.#cart = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
        if(this.#cart.id_cart === id_cart){
            return this.#cart.productos.map(element => element, [])
        } else {
            return null
        }    
    }

    // async getById(id) {
    //     this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
    //     const foundElement = this.#elements.find(element => element.id == id)
    //     return foundElement         
    // }



    // async deleteById(id) {
    //     this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
    //     this.#elements = this.#elements.filter(elements => elements.id != id)
    //     await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements))
    // }




    // async update(id, updatedProd) {
    //     this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
    //     const searchedIndex = this.#elements.findIndex(element => element.id === id);
    //     if (searchedIndex === -1) {
    //         return null
    //     } else {
    //         const prodId = this.#elements[searchedIndex].id
    //         this.#elements[searchedIndex].id = updatedProd
    //         this.#elements[searchedIndex].id = prodId
    //         await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements))
    //         return true
    //     }
    // }

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

module.exports = { ContenedorCarrito };