import crypto from 'crypto'
import { UsuarioDto } from '../dtos/usuariosDto.js';
import { encriptador } from '../jwt/jwt.js';


function crearId() {
    return crypto.randomUUID()
}

export class Usuario {
    #_id
    #email
    #password
    #name
    #lastname
    #image
    #role
   
        constructor({ _id = crearId(), email, password, name, lastname, image, role }) {
            this.#_id = _id
            this.#email = email
            this.#password = encriptador(password)
            this.#name = name
            this.#lastname =lastname
            this.#image = image //ver cómo asociar imagen a la subida por multer -url
            this.#role = role
        }

        get email() { 
            return this.#email 
        }

        asDto() {
            return new UsuarioDto({
                _id: this.#_id,
                email: this.#email,
                password: this.#password,
                name: this.#name,
                lastname: this.#lastname,
                image: this.#image,
                role: this.#role
            })           
        }
    }
