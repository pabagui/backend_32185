import axios from 'axios'
// import { conectar, desconectar } from '../../src/app/servidor.js'
// import { usuariosDao } from '../../src/daos/index.js'
// import { Usuario } from '../../src/models/Usuario.js'
import { conectar, desconectar } from '../../src2/main.js'
import { VentasService } from '../../src2/services/ventasService-js'
import { ProductDto } from '../../src2/dtos/productoDto.js'

axios.defaults.baseURL = 'http://localhost:8080/api/ventas'

describe('pruebas de integración', () => {

    // antes de TODAS las pruebas
    before(async () => {
        await conectar(8080)
    })

    // dsp de TODAS las pruebas
    after(async () => {
        await desconectar()
    })

    // antes de CADA prueba!
    beforeEach(async () => {
        // await usuariosDao.borrarTodos()
        await VentasService.borrarTodos()
    })

    // dsp de CADA prueba!
    afterEach(async () => {
        // await usuariosDao.borrarTodos()
        await VentasService.borrarTodos()
    })

    describe('servidor', () => {
        it('creación de un producto', async () => {

            const nombreDelProducto = 'nombre de prueba'

            const { data: resultado, status } = await axios.post('/', {
                name: nombreDelProducto
            })

            if (!resultado) throw new Error()
            if (status !== 201) throw new Error('el estado debe ser 201')
            if (!resultado) throw new Error('el producto creado es nulo')
            if (!resultado.name) throw new Error('el producto creado no tiene nombre')
            if (resultado.name !== nombreDelProducto) throw new Error('el producto creado no tiene el mismo nombre que el enviado')
            if (!resultado.id) throw new Error('el usuproducto creado no tiene id')
            if (typeof resultado.id !== 'string') throw new Error('el producto creado tiene un id con tipo no string')

        })

        it('consulta de un usuario', async () => {
            // preparación de la base
            // const usuarioDto = new Usuario({ nombre: 'pepe' }).asDto()
            const productoDto = new ProductDto({ name: 'mochila' }).asDto()
            // await usuariosDao.guardar(usuarioDto)
            // await VentasService.vender(usuarioDto)
            await VentasService.guardar(productoDto)
            await VentasService.vender(productoDto)

            // ejecucion de la prueba
            const { data: resultado, status } = await axios.get(`/${usuarioDto.id}`)

            // validacion
            if (status !== 200) throw new Error('el estado debe ser 200')
            if (!resultado) throw new Error('no se encontró el usuario buscado')
            if (!resultado.nombre) throw new Error('el usuario encontrado no tiene nombre')
            if (!resultado.id) throw new Error('el usuario creado no tiene id')
            if (resultado.id !== usuarioDto.id) throw new Error('el usuario encontrado no tiene el mismo id que el buscado')
        })
    })
})