import { logger } from '../../config/logger.js';

class FormatoInvalido extends Error {
    constructor(item) {
      super(`formato inválido: ${item}!`);
      this.type = 'INVALID_FORMAT';
    }
  }


  class ArgumentoInvalido extends Error {
    constructor(message) {
      if (message) {
        super(`argumento inválido: ${message}!`);
      } else {
        super(`argumento faltante!`);
      }
      this.type = 'INVALID_ARGUMENT';
    }
  }

export class ValidadorDeLogin {
  constructor({ email, password }) {
    this.email = email;
    if (typeof this.email !== 'string' || !this.email) throw new ArgumentoInvalido('email');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email)) throw new FormatoInvalido('email');
    if (/\s/.test(this.email)) throw new FormatoInvalido('email: no debe haber espacios vacíos');

    this.password = password;
    if (typeof this.password !== 'string' || !this.password) throw new ArgumentoInvalido('password');
    if (/\s/.test(this.password)) throw new FormatoInvalido('password: no debe haber espacios vacíos');
  }
}



export class ValidadorDeProducto {
  constructor({ name, description, price, image }) {
    this.name = name;
    if (typeof this.name !== 'string' || !this.name) throw new FormatoInvalido('product name');
    if (this.name.replace(/\s+/g, '').length === 0) throw new ArgumentoInvalido('product name');

    this.description = description;
    if (typeof this.description !== 'string' || !this.description) throw new FormatoInvalido('product description');
    if (this.description.replace(/\s+/g, '').length === 0) throw new ArgumentoInvalido('product description');

    this.price = price;
    if (!Number.isInteger(this.price)) throw new FormatoInvalido('price: debe ser un número entero');
    if (this.price <= 0) throw new ArgumentoInvalido('price: debe ser mayor a 0');

    this.image = image;
    if (typeof this.image !== 'string') throw new FormatoInvalido('imageUrl: debe ser un string');
    if (this.image.replace(/\s+/g, '').length === 0) throw new ArgumentoInvalido('product imageUrl');
    try {
      this.image = new URL(image)
      if (this.image.href.indexOf('images') === -1) throw new ArgumentoInvalido('imageUrl: no debe haber espacios vacíos');
    } catch (e) {
      logger.error(error);
      throw e;
    }
  }
}


export class ValidadorDeUsuario {
    constructor({ email, password, name, lastname, image }) {
      this.email = email;
      if (typeof this.email !== 'string' || !this.email) throw new ArgumentoInvalido('email');
      if (/\s/.test(this.email)) throw new FormatoInvalido('email: no debe haber espacios vacíos');
  
      this.password = password;
      if (typeof this.password !== 'string' || !this.password) throw new ArgumentoInvalido('password');
      if (/\s/.test(this.password)) throw new FormatoInvalido('password: no debe haber espacios vacíos');
  
      this.name = name;
      if (typeof this.name !== 'string' || !this.name) throw new ArgumentoInvalido('name');
      if (/\s/.test(this.name)) throw new FormatoInvalido('name: no debe haber espacios vacíos');
  
      this.lastname = lastname;
      if (typeof this.lastname !== 'string' || !this.lastname) throw new ArgumentoInvalido('lastname');
      if (/\s/.test(this.lastname)) throw new FormatoInvalido('lastname: no debe haber espacios vacíos');
  
      this.image = image;
      if (typeof this.image !== 'string' || !this.image) throw new ArgumentoInvalido('image');
      if (/\s/.test(this.image)) throw new FormatoInvalido('imageUrl: no debe haber espacios vacíos');
      try {
        this.image = new URL(image)
        if (this.image.href.indexOf('images') === -1) throw new ArgumentoInvalido('imageUrl incorrecta');
      } catch (error) {
        logger.error(error);
        throw error;
      }
    }
  }