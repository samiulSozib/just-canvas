const router = require('express').Router()
const {
    getPostPageController,
    postPostPageController,
    getMyAllPost,
    postDetails,
    postDetailsController,
    updatePostPage,
    updatePostController,
    deletePost,
    getPosttByCategory,
    downloadController
} = require('../controller/postController')
const upload = require('../middleware/uploadMiddleware')
const fileUpload = require('../middleware/fileUploadMiddleware')
const multiUpload = require('../middleware/multiUpload')
const { authCheck } = require('../middleware/authCheck')

router.get('/create-post', authCheck, getPostPageController)
router.post('/create-post', authCheck, upload.array('post-thumbnail'), postPostPageController)
router.post('/create-post', authCheck, multiUpload, postPostPageController)
router.get('/download/upload/:fileurl', authCheck, downloadController)

router.get('/my-posts', authCheck, getMyAllPost)
router.get('/post-details/:id', postDetailsController)
router.get('/details/:id', postDetails)

router.get('/update-post/:id', authCheck, updatePostPage)
router.post('/update-post/:id', authCheck, upload.single('post-thumbnail'), updatePostController)
router.get('/delete-post/:id', authCheck, deletePost)

router.get('/:category', authCheck, getPosttByCategory)


module.exports = router