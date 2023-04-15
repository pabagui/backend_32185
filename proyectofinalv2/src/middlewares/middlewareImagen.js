import multer from "multer";

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        // const nombreFinal = `${Date.now()}-${file.originalname}`
        const nombreFinal = `${Date.now()}-${file.fieldname}`
        cb(null, nombreFinal)
    }
})

const upload = multer({ storage })

// export const middlewareDeUnArchivo = upload.single('miArchivo')
export const middlewareDeUnArchivo = upload.none()
// export const middlewareDeUnArchivo = upload.any()
export const middlewareDeVariosArchivos = upload.array('misArchivos')

