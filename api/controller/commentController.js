const Comment = require('../../model/Comment')
const Post = require('../../model/Post')

exports.commentPostController = async(req, res, next) => {
    let { postId } = req.params
    let { body } = req.body

    if (!req.user) {
        return res.status(403).json({
            message: 'You are not an authenticated user'
        })
    }

    let commnet = new Comment({
        post: postId,
        user: req.user._id,
        body,
        replies: []
    })

    try {

        let createdComment = await commnet.save()

        await Post.findOneAndUpdate({ _id: postId }, { $push: { 'comments': createdComment._id } })

        let commentJSON = await Comment.findById(createdComment._id).populate({
            path: 'user',
            select: 'avatar name'
        })

        return res.status(201).json(commentJSON)

    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.replyCommentPostController = async(req, res, next) => {


    let { commentId } = req.params
    let { body } = req.body

    if (!req.user) {
        return res.status(403).json({
            error: 'You are not an authenticated user'
        })
    }

    let reply = {
        body,
        user: req.user._id
    }

    try {

        await Comment.findOneAndUpdate({ _id: commentId }, { $push: { 'replies': reply } })

        res.status(201).json({
            ...reply,
            avatar: req.user.avatar,
            name: req.user.name
        })

    } catch (e) {
        console.log(e)
        return res.status(500).json({
            error: 'Server Error Occured'
        })
    }

}