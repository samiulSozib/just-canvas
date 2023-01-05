const router = require('express').Router()
const {
    getAllCategory,
    createCategory,
    createCategoryPage,
    deleteCategory,
    getMagazinePageController,
    getMagazineDetails,
    approvePending,
    deleteMagazine,
    getEditorPage,
    addEditor,
    addEditorPage,
    deleteEditor
} = require('../controller/adminController')
const { authCheck } = require('../middleware/authCheck')


router.get('/category', authCheck, getAllCategory)
router.get('/create-category', authCheck, createCategoryPage)
router.post('/create-category', authCheck, createCategory)
router.get('/delete-category/:id', authCheck, deleteCategory)



router.get('/magazine-details/:id', authCheck, getMagazineDetails)
router.get('/magazine-status/:id', authCheck, approvePending)
router.get('/magazine', authCheck, getMagazinePageController)
router.get('/magazine-delete/:id', authCheck, deleteMagazine)


router.get('/editor', authCheck, getEditorPage)
router.get('/add-editor', authCheck, addEditorPage)
router.post('/add-editor', authCheck, addEditor)
router.get('/delete-editor/:id', authCheck, deleteEditor)

module.exports = router