import { fork } from 'child_process'
import path from 'path'

/*
let randomNumber = Math.random()*1000

export function controllerGetRandoms(req, res) {
    res.send(process.send(randomNumber))
}
*/

export function controllerGetRandoms(req, res) {
    let randomNumber = fork(path.resolve(process.cwd()), './computo.js')
    randomNumber.on('message', resultado => {
        if (resultado === 'listo') {
            randomNumber.send('start')
        } else {
            res.json({ resultado })
        }
    })   
}