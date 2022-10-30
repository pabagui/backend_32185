//let products = [];
//console.log(products);

class Contenedor {
    #objects

    constructor(){
        this.#objects = []
    }
   
    
    save = (object) => {
            this.#objects.push(object);
            console.log('Producto agregado')
    }
    
    getById = (x) => {
            console.log('Se seleccionó un producto');
            console.log(this.#objects.find(object => object.id == x));    
    };

    getAll = () => {
        return console.log(this.#objects)
    };

    deleteById = (id) => {
        this.#objects.splice(id-1, 1);
        console.log('Se eliminó un producto');
    };

    deleteAll = () => {
        this.#objects.splice(0 , this.#objects.length);
        console.log('Todos los productos eliminados');
    };

};

const products = new Contenedor();
console.log(products);

const p1 = {
    id: 1,
    title:'mochila', 
    price:20000, 
    thumbnail:'png1'
}

const p2 = {
    id: 2,
    title: 'alforja',
    price: 40000,
    thumbnail: 'png2'
}

const p3 = {
    id: 3,
    title: 'banano',
    price: 10000,
    thumbnail: 'png3'
}

const p4 = {
    id: 4,
    title: 'billetera',
    price: 5000,
    thumbnail: 'png4'
};

products.save(p1);
products.save(p2);
products.save(p3);
products.save(p4);
products.getById(3);
products.getAll();
products.deleteById(4);
products.getAll();
products.deleteAll();
products.getAll();