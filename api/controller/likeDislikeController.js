const Post = require('../../model/Post')

exports.likeGetController = async(req, res, next) => {
    let { postId } = req.params
    let liked = null

    let userId = req.user._id

    if (!req.user) {
        return res.status(404).json({
            error: 'Yor are not an authenticated user'
        })
    }

    try {


        let post = await Post.findById(postId)

        if (post.dislikes.includes(userId)) {
            await Post.findByIdAndUpdate({ _id: postId }, { $pull: { 'dislikes': userId } })
        }

        if (post.likes.includes(userId)) {
            await Post.findByIdAndUpdate({ _id: postId }, { $pull: { 'likes': userId } })
            liked = false;
        } else {
            await Post.findByIdAndUpdate({ _id: postId }, { $push: { 'likes': userId } })
            liked = true
        }

        let updatedPost = await Post.findById(postId)
        res.status(200).json({
            liked,
            totalLikes: updatedPost.likes.length,
            totalDislikes: updatedPost.dislikes.length
        })


    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.dislikesGetController = async(req, res, next) => {
    let disliked = null
    let { postId } = req.params
    let userId = req.user._id

    if (!req.user) {
        return res.status(403).json({
            error: 'You are not an authenticated user'
        })
    }

    try {

        let post = await Post.findById(postId)

        if (post.likes.includes(userId)) {
            await Post.findOneAndUpdate({ _id: postId }, { $pull: { 'likes': userId } })
        }

        if (post.dislikes.includes(userId)) {
            await Post.findOneAndUpdate({ _id: postId }, { $pull: { 'dislikes': userId } })
            disliked = false
        } else {
            await Post.findOneAndUpdate({ _id: postId }, { $push: { 'dislikes': userId } })
            disliked = true
        }

        let updatedPost = await Post.findById(postId)
        res.status(200).json({
            disliked,
            totalLikes: updatedPost.likes.length,
            totalDislikes: updatedPost.dislikes.length
        })

    } catch (e) {
        console.log(e)
        next(e)
    }
}