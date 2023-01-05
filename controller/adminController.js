const Category = require('../model/Category')
const mongoose = require('mongoose')
const Post = require('../model/Post')
const User = require('../model/User')


exports.getAllCategory = async(req, res, next) => {
    try {
        let categories = await Category.find()
        console.log(categories)
        return res.render('pages/admin/category', { title: 'Admin', user: req.user, categories })
    } catch (e) {
        console.log(e)
        next(e)
    }
}


exports.createCategoryPage = async(req, res, next) => {
    try {
        return res.render('pages/admin/create_category', { title: 'Admin', user: req.user })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.createCategory = async(req, res, next) => {
    try {

        let { category } = req.body
        let createdCategory = await Category.create({
            name: category.toLowerCase()
        })

        return res.redirect('/admin/category')
            //console.log(createdCategory)

    } catch (e) {
        console.log(e)
        next(e)
    }
}



exports.deleteCategory = async(req, res, next) => {
    try {
        let category_id = req.params.id

        if (!mongoose.Types.ObjectId.isValid(category_id)) {
            return res.json({
                msg: 'There is no Category with this id'
            })
        }

        let deletedCategory = await Category.findByIdAndDelete(category_id)

        if (deletedCategory) {
            return res.redirect('/admin/category')
        }


    } catch (e) {
        console.log(e)
        next(e)
    }
}


exports.getMagazinePageController = async(req, res, next) => {
    try {
        let posts = await Post.find()
        return res.render('pages/admin/magazine', { title: 'Admin', user: req.user, posts })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.getMagazineDetails = async(req, res, next) => {
    try {
        let id = req.params.id
        let post = await Post.findById(id)
        return res.render('pages/admin/magazineDetails', { title: 'Admin', user: req.user, post })

    } catch (e) {
        console.log(e)
        next(e)
    }
}


exports.approvePending = async(req, res, next) => {
    try {
        let id = req.params.id
        let approve = null
        let post = await Post.findById(id)

        if (post.status === '1') {
            await Post.findByIdAndUpdate(id, { status: '0' })
            approve = false
            return res.status(200).json({ approve })
        } else {
            await Post.findByIdAndUpdate(id, { status: '1' })
            approve = true
            return res.status(200).json({ approve })
        }
    } catch (e) {
        console.log(e)
        next()
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
            return res.redirect('/admin/magazine')
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.getEditorPage = async(req, res, next) => {
    try {
        let editor = await User.find({
            role: '4'
        })

        return res.render('pages/admin/editor', { title: 'Editor', editor, user: req.user })
    } catch (e) {
        console.log(e)
        next(e)
    }
}


exports.addEditorPage = async(req, res, next) => {
    try {
        return res.render('pages/admin/add-editor', { title: 'Add Editor', user: req.user })
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.addEditor = async(req, res, next) => {
    try {
        let { editorName, editorEmail } = req.body
        console.log(editorName + " " + editorEmail)
        if (editorName === "" || editorEmail === "") {
            return res.redirect('/admin/add-editor')
        }
        let creadEditor = await User.create({
            googleId: "",
            name: editorName,
            avatar: "",
            department_id: "",
            student_id: "",
            session: "",
            email: editorEmail,
            department_name: "",
            university_name: "",
            role: '4',
            status: "1"
        })
        return res.redirect('/admin/editor')
    } catch (e) {
        console.log(e)
        next(e)
    }
}

exports.deleteEditor = async(req, res, next) => {
    try {
        let editorId = req.params.id
        console.log(editorId)
        if (!mongoose.Types.ObjectId.isValid(editorId)) {
            return res.json({
                msg: 'There is no Editotr with this id'
            })
        }

        let deletedEditor = await User.findByIdAndDelete(editorId)

        if (deletedEditor) {
            return res.redirect('/admin/editor')
        }
    } catch (e) {
        console.log(e)
        next(e)
    }
}