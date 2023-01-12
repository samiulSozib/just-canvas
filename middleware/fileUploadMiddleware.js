const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/uploads')
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + '-' + file.originalname)
    }
})

const fileUpload = multer({
    storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    // fileFilter: (req, file, cb) => {
    //     const types = /pdf|doc|docx/
    //     const extName = types.test(path.extname(file.originalname).toLowerCase())
    //     const mimeType = types.test(file.mimetype)

    //     if (extName && mimeType) {
    //         cb(null, true)
    //     } else {
    //         cb(new Error('Only supported File required'))
    //     }
    // }
})

module.exports = fileUpload