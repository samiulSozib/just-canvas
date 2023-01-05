const router = require('express').Router()
const { authCheck } = require('../middleware/authCheck')
const upload = require('../middleware/uploadMiddleware')
const { getMagazineDetails, getMagazinePageController, deleteMagazine, editMagazine, postEditMagazine, sendAdmin } = require('../controller/editorController')


router.get('/magazine', authCheck, getMagazinePageController)
router.get('/magazine-details/:id', authCheck, getMagazineDetails)
router.get('/magazine-delete/:id', authCheck, deleteMagazine)
router.get('/magazine-edit/:id', authCheck, editMagazine)
router.post('/magazine-edit/:id', authCheck, upload.single('post-thumbnail'), postEditMagazine)
router.get('/magazine-status/:id', authCheck, sendAdmin)

module.exports = router