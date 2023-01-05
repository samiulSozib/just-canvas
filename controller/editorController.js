const Category = require('../model/Category')
const mongoose = require('mongoose')
const Post = require('../model/Post')
const User = require('../model/User')

exports.getMagazinePageController = async(req, res, next) => {
    try {
        let posts = await Post.find()
        return res.render('pages/editor/magazine', { title: 'Editor', user: req.user, posts })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.getMagazineDetails = async(req, res, next) => {
    try {
        let id = req.params.id
        let post = await Post.findById(id)
        return res.render('pages/editor/magazineDetails', { title: 'Editor', user: req.user, post })

    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.deleteMagazine = async(req, res, next) => {
    try {
        let postId = req.params.id
        if (!mongoose.Types.ObjectId.isValid(postId)) {
            return res.json({
                msg: 'There is no Magazine with this id'
            })
        }

        let deletedMagazine = await Post.findByIdAndDelete(postId)

        if (deletedMagazine) {
            return res.redirect('/editor/magazine')
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.editMagazine = async(req, res, next) => {
    try {
        let postId = req.params.id
        let post = await Post.findById(postId)
        let categories = await Category.find()
        return res.render('pages/editor/edit-magazine', { title: 'Editor', categories, user: req.user, post, error: {} })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.postEditMagazine = async(req, res, next) => {
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

        return res.redirect(`/editor/magazine-details/${postId}`)
    } catch (e) {
        console.log(e)
        next(e)
    }
}


exports.sendAdmin = async(req, res, next) => {
    try {
        let id = req.params.id
        let approve = null
        let post = await Post.findById(id)

        if (post.status === '-1') {
            await Post.findByIdAndUpdate(id, { status: '0' })
            approve = false
            return res.status(200).json({ approve })
        } else {
            await Post.findByIdAndUpdate(id, { status: '-1' })
            approve = true
            return res.status(200).json({ approve })
        }
    } catch (e) {
        console.log(e)
        next()
    }
}