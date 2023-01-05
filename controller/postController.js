const User = require('../model/User')
const readingTime = require('reading-time');
const Post = require('../model/Post');
const mongoose = require('mongoose')
const fs = require('fs');
const Category = require('../model/Category');

exports.getPostPageController = async(req, res, next) => {
    try {
        let user_id = req.user.id
        let user = await User.findById(user_id);
        let categories = await Category.find()
        return res.render('pages/post/create_post', { title: 'Create Post', user, error: {}, categories })
    } catch (e) {
        console.log(e)
    }
}

exports.postPostPageController = async(req, res, next) => {
    try {
        let { title, category, body } = req.body


        let post = new Post({
            status: '0',
            title,
            category,
            body,
            thumbnail: '',
            author: req.user.id,
            author_name: req.user.name,
            likes: [],
            dislikes: [],
            comments: []
        })
        if (req.file) {
            post.thumbnail = `/uploads/${req.file.filename}`
        }


        //console.log(post)

        let createdPost = await post.save()
        if (createdPost) {
            return res.redirect('/')
        } else {
            alert('Post Create Fail')
            return res.redirect('/')
        }

    } catch (e) {
        console.log(e)
    }
}



// my all posts 

exports.getMyAllPost = async(req, res, next) => {
    try {
        let user_id = req.user.id
            //console.log(user_id)
        let user = await User.findById(user_id)
        let posts = await Post.find({ author: user_id })
        return res.render('pages/post/my_posts', { title: "My Posts", user, posts })

    } catch (e) {
        console.log(e)
        next()
    }
}

// post details controller

exports.postDetails = async(req, res, next) => {
    try {
        let postId = req.params.id
        let post = await Post.findById(postId)
            //return res.json(post)
        let categories = await Category.find()
        let recentPosts = await Post.find().limit(2)
        return res.render('pages/postDetails', { title: post.title, post, categories, recentPosts })
    } catch (e) {
        console.log(e)
        next()
    }
}

exports.postDetailsController = async(req, res, next) => {
    try {

        let postId = req.params.id
            //let post = await Post.findById(postId)
        let post = await Post.findById(postId)
            .populate({
                path: 'comments',
                populate: {
                    path: 'user',
                    select: 'name avatar'
                },
            })
            .populate({
                path: 'comments',
                populate: {
                    path: 'replies.user',
                    select: 'name avatar'
                }
            })
            //return res.json(post)
            //console.log(req.user)

        let categories = await Category.find()
        let recentPosts = await Post.find().limit(2)
        console.log(recentPosts)
        return res.render('pages/post/postDetails2', { title: post.title, user: req.user, post, categories, recentPosts })
    } catch (e) {
        console.log(e)
        next()
    }
}

exports.updatePostPage = async(req, res, next) => {
    try {

        let postId = req.params.id
        let post = await Post.findById(postId)
            //return res.json(post)
        let categories = await Category.find()
        return res.render('pages/post/update_post', { title: 'Update Post', user: req.user, post, error: {}, categories })

    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.updatePostController = async(req, res, next) => {
    try {

        let postId = req.params.id
        let { title, category, body } = req.body
        let post = await Post.findById(postId)

        let thumbnail = post.thumbnail


        if (req.file) {
            thumbnail = `/uploads/${req.file.filename}`
        }

        let updatePost = await Post.findByIdAndUpdate({
            _id: post._id,

        }, { $set: { title, category, body, thumbnail } }, { new: true })

        return res.redirect('/auth/profile')


    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.deletePost = async(req, res, next) => {
    let postId = req.params.id
    try {
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.json({
                msg: 'There is no post with this id'
            })
        }

        let post = await Post.findById(postId)
        let thumbnailImage = post.thumbnail

        let deletePost = await Post.findByIdAndDelete(postId)

        if (deletePost) {
            fs.unlink(`public${thumbnailImage}`, error => {
                if (error) {
                    res.json({
                        message: 'Post Thumbnail delete failed'
                    })
                }
            })
        }
        return res.redirect('/auth/profile')

    } catch (e) {
        console.log(e)
        next(e)
    }
}


// get posts by category 

exports.getPosttByCategory = async(req, res, next) => {
    try {
        let cat = req.params.category
            //return res.json(cat)
        let posts = await Post.find({ category: cat })
            //return res.json(posts)
        return res.render('pages/post/categoryPost', { title: cat.toUpperCase(), user: req.user, posts, cat })
    } catch (e) {
        console.log(e)
        next()
    }
}