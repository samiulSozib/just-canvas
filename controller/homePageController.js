const Post = require('../model/Post')

exports.getHomePage = async(req, res, next) => {
    try {
        console.log(req.user.role)
        let posts = await Post.find({ status: "1" })
        if (req.user.role == '2') {
            return res.render('pages/student/student_homepage', { title: "Homepage " + req.user.student_id, user: req.user, posts })
        } else if (req.user.role == '1') {
            return res.render('pages/teacher/teacher_homepage', { title: "Homepage-Teacher", user: req.user, posts })
        } else if (req.user.role == '3') {
            return res.render('pages/admin/admin_homepage', { title: 'Admin Homepage', user: req.user, posts })
        } else if (req.user.role == '4') {
            return res.render('pages/admin/editor_homepage', { title: 'Editor Homepage', user: req.user, posts })
        }
    } catch (e) {
        console.log(e)
    }

}