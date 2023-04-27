/*
import crypto from 'crypto'

function crearId() {
    return crypto.randomUUID()
}
*/

export class UsuarioDto {
// constructor({ idCliente = crearId(), email, password, name, lastname, image }) {
    constructor({ _id, email, password, name, lastname, image, role }) {
        this._id = _id
        this.email = email
        this.password = password
        this.name = name
        this.lastname = lastname
        this.image = image //ver cómo asociar imagen a la subida por multer -url
        this.role = role
    }
}