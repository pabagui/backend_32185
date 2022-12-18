// const  fs = require('fs');
import fs from'fs';

export  class ContenedorArchivo {
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

        async getAll() {
            this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
            return this.#elements
            // return this.#elements.map(e => e, [])
        }

        async getById(id) {
            this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
            const foundElement = this.#elements.find(element => element.id == id)
            return foundElement         
        }



        async deleteById(id) {
            this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
            // this.#elements.splice(id-1, 1);
            this.#elements = this.#elements.filter(elements => elements.id != id)
            await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements))
        }

    //    async deleteAll() {
    //         this.#elements.splice(0 , this.#elements.length)
    //         await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements))
    //     }

        // async update(id, put) {
        //     this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
        //     const searchedIndex = this.#elements.findIndex(prod => prod.id === id); 
        //     if (searchedIndex === -1){
        //         return null
        //     } else {
        //         const idProd = this.#elements[searchedIndex].id
        //         this.#elements[searchedIndex] = put
        //         // this.#elements[searchedIndex].id =idProd
        //         put.id =idProd
        //         await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements))
        //     }
        // }


        async update(id, updatedProd) {
            this.#elements = JSON.parse(await fs.promises.readFile(this.#route, 'utf-8'))
            const searchedIndex = this.#elements.findIndex(element => element.id === id);
            if (searchedIndex === -1) {
                return null
            } else {
                const prodId = this.#elements[searchedIndex].id
                this.#elements[searchedIndex].id = updatedProd
                this.#elements[searchedIndex].id = prodId
                await fs.promises.writeFile(this.#route, JSON.stringify(this.#elements))
                return true
                // return prodId
            }
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

// module.exports = { ContenedorArchivo };