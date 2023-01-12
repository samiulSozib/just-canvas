const upload = require('../middleware/uploadMiddleware')
const fileUpload = require('../middleware/fileUploadMiddleware')

function multiUpload(req, res, next) {

    upload.single('post-thumbnail')(req, res, next)
    fileUpload.single('post-file')(req, res, next);
    next();
}

module.exports = multiUpload