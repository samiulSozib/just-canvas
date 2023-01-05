exports.authCheck = (req, res, next) => {
    if (!req.user) {
        return res.redirect('/auth/login')
    } else {
        next()
    }
}

exports.authCheck2 = (req, res, next) => {
    if (req.user) {
        return res.redirect('/home')
    } else {
        next()
    }
}