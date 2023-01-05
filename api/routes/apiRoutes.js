const router = require('express').Router()

const { authCheck } = require('../../middleware/authCheck')
const { likeGetController, dislikesGetController } = require('../controller/likeDislikeController')
const { commentPostController, replyCommentPostController } = require('../controller/commentController')


router.get('/likes/:postId', authCheck, likeGetController)
router.get('/dislikes/:postId', authCheck, dislikesGetController)

router.post('/comments/:postId', authCheck, commentPostController)
router.post('/comments/replies/:commentId', authCheck, replyCommentPostController)

module.exports = router