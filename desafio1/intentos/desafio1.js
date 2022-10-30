/*
let product = {
    id:;
    title:;
    price:;
    thumbnail:;
}
*/



class Contenedor {
    
    #id
    #title
    #price
    #thumbnail
    
    constructor(id, title, price, thumbnail) {
        this.#id = id;
        this.#title = title;
        this.#price = price;
        this.#thumbnail = thumbnail;
    }
    
    //métodos
    //let products = [];

    /*
        save() {
        return products.push();
    }
    */
}



const p1 = new Contenedor('1', 'mochila', 20000, 'png1');
const p2 = new Contenedor('2', 'alforja', 40000, 'png2');
const p3 = new Contenedor('3', 'banano', 10000, 'png3');
const p4 = new Contenedor('4', 'billetera', 5000, 'png4');

console.log(p1);
console.log(p2);
console.log(p3);
console.log(p4);


let products = [];

//products.push(p1);
save = (product) => {
    return products.push(product)
};

getById = (x) => {
    return products.filter(product => product.id = x)
};

getAll = () => {
    return console.log(products)
};

/*
gett = () => {
 //usar bucle for?
}
*/

deleteById = (id) => {
    return products.splice(id-1, 1)
};

deleteAll = () => {
    return products.splice(0 , products.length)
}

save(p1);
save(p2);
save(p3);
save(p4);
getAll();

getById(2);


//deleteById(2);
console.log(products);
//deleteAll();
console.log(products);

/* save(object): void- recibe un objeto y lo guarda
   getById(number): object- recibe un id y devuelve el objeto con ese id o null si no está
   getAll(): object[]: devuelve un array con los objetos presentes
   deleteById(number): void- elimina el objeto co el id buscado
   deleteAll(): void- elimina todos los objetos presentes
*/