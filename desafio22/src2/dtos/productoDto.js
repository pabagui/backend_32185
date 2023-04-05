
export class ProductDto {
    constructor({ id, name, precio, stock }) {
        this.id = id;
        this.name = name;
        this.stock = stock;
        this.precio = precio;
    }
}