import { faker } from '@faker-js/faker';

class ContenedorFaker {
    #products;
    constructor() {
      this.#products = [];
    }
  
    async create() {
      for (let quantity = 0; quantity < 5; quantity++) {
        const item = {
        //   id: quantity,
        //   name: faker.commerce.productName(),
        //   price: faker.commerce.price(),
        //   description: faker.commerce.productDescription(),
        //   thumbnail: faker.image.technics()
          title: faker.commerce.productName(),
          price: faker.commerce.price(),
          thumbnail: faker.image.technics()
        };
        this.#products.push(item);
      }
    }
  
    async getAll() {
      await this.create();
      return this.#products;
    }
  }

  export const productosFaker = new ContenedorFaker();