const passport = require('passport')
const Post = require('../model/Post')
const User = require('../model/User')


exports.getLogin = async(req, res, next) => {
    return res.render('pages/auth/login', { title: "Login Page", user: req.user })
}


exports.googleRedirect = async(req, res, next) => {
    //res.send(req.user)
    return res.redirect('/home')
}


exports.getLogout = async(req, res, next) => {
    req.logout()
    return res.redirect('/')
}

exports.getProfilePage = async(req, res, next) => {
    try {
        let user_id = req.user.id
        let user = await User.findById(user_id)
        let posts = await Post.find({ author: user_id })

        console.log(user)
        return res.render('pages/profile/my-profile', { title: "Profile Page", user, posts })

    } catch (e) {
        console.log(e);
    }
}


exports.getAuthorProfile = async(req, res, next) => {
    let { userId } = req.params
    console.log(userId)

    if (userId == req.user._id) {
        return res.redirect('/auth/profile')
    }

    try {

        let profile = await User.findOne({ _id: userId })

        let posts = await Post.find({ author: userId })
            //console.log(posts)
        return res.render('pages/profile/author_profile', { title: `${profile.name}`, profile, posts })

    } catch (e) {
        console.log(e)
        next(e)
    }
}