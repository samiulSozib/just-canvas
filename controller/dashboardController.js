const Post = require('../model/Post')

exports.getDashboardController = async(req, res, next) => {

    try {

        let posts = await Post.find()
            //console.log(posts)
        return res.render('pages/dashboard', { title: "Dashboard", posts })

    } catch (e) {
        console.log(e)
        next()
    }


}