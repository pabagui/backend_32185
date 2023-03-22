export function errorHandler(error, req, res, next) {
    switch (error.tipo) {
        case 'ID_NO_ENCONTRADO':
            res.status(404)
            break
        case 'FALTA_DE_STOCK':
        case 'ARGUMENTO_INVALIDOS':
            res.status(400)
            break
        case 'ERROR_INTERNO':
            res.status(500)
            break
        default:
            res.status(500)
    }
    res.json({ message: error.message })
}