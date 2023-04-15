export const uploadFileController = (req, res) => {
    // const file = req.file
    const file = req.body
    // const file = req.body.name
    if (!file) {
        res.status(400)
        return res.send('Error subiendo archivo')
        // res.send(file)
    }
    // res.send(`Archivo <b>${file.originalname}</b> subido exitosamente`)
    // res.send(`Archivo <b>${file.originalname}</b> subido exitosamente`)
    res.send(`Archivo <b>${file.fieldname}</b> subido exitosamente`)
}

export const uploadFilesController = (req, res) => {
    const files = req.files
    if (!files || files.length == 0) {
        res.status(400)
        return res.send('Error subiendo archivos')
    }
    res.send(`Archivo <b>${files.originalname}</b> subido exitosamente`)
    // res.send(files)
}


/*
//   const file = req.file
const file = req.body

if (!file) {
  res.status(400)
  // return res.send('Error subiendo archivo')
  return res.json('Error subiendo archivo')

}
//   res.send(`Archivo <b>${file.originalname}</b> subido exitosamente`)
res.json(`Archivo <b>${file.originalname}</b> subido exitosamente`)
// console.log(file)
*/