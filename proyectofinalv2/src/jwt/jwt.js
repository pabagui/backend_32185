import jwt from "jsonwebtoken"
import { PRIVATE_KEY } from '../../config/config.js'

export function encriptador(password) {
    const claveEncriptada = jwt.sign(password, PRIVATE_KEY);
    return claveEncriptada;
}

export function desencriptador(pass) {
    const claveDesencriptada = jwt.verify(pass, PRIVATE_KEY)
    return claveDesencriptada;
}

