/*
export const uploadFileController = (req, res) => {
    // const file = req.file
    const file = req.body
    // const file = req.body.name
    if (!file) {
        res.status(400)
        return res.send('Error subiendo archivo')
        // res.send(file)
    }
    res.send(`Archivo <b>${file.originalname}</b> subido exitosamente`)
    // res.send(`Archivo <b>${file.toString}</b> subido exitosamente`)
    // res.send(`Archivo <b>${file.fieldname}</b> subido exitosamente`)
    console.log(file)
    // console.log(req.file)
}
*/

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
export const uploadFileController = (req, res) => {
    if (req.file === undefined) {
        res.status(400)
        return res.json({ error: false, msg: "Error subiendo archivo"})
    } else {
    //  const url = req.protocol + "://" + req.get("host") + "/uploads/" + req.file.filename
     const url = req.file.filename
     res.status(200)
     return res.json({error: false, msg: 'Archivo cargado exitosamente', imgUrl: url})
    }
}
*/

    export const uploadFileController = (req, res) => {  
      const file = req.file   
    //   const file = req.body   
        // if (!file) {
        if (file === undefined) {   
            res.status(400)
            return res.json({ error: false, msg: "Error subiendo archivo"})
        } else {
         const url = req.protocol + "://" + req.get("host") + "/uploads/" + file.filename
        //  const url = req.body.filename
        //  const url = req.file.filename
         res.status(200)
        //  return res.json({error: false, msg: `Archivo ${file.originalname} cargado exitosamente`, imgUrl: url})  
         return res.json({error: false, msg: `Archivo ${file.originalname} cargado exitosamente`, imgUrl: url})        
        }    

/*
    // const file = req.file
    const file = req.body
    // const file = req.body.name
    if (!file) {
        res.status(400)
        return res.send('Error subiendo archivo')
        // res.send(file)
    }
    res.send(`Archivo <b>${file.originalname}</b> subido exitosamente`)
    // res.send(`Archivo <b>${file.toString}</b> subido exitosamente`)
    // res.send(`Archivo <b>${file.fieldname}</b> subido exitosamente`)
    console.log(file)
    // console.log(req.file)
 */   
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

export const getImageController = (req, res) => {  
    const url = req.protocol + "://" + req.get("host") + "/uploads"
       res.status(200)
      
       return res.json({error: false, uploadsUrl: url})        
      }    
