const router = require('express').Router()
const passport = require('passport')
const { getLogin, googleRedirect, getLogout, getProfilePage, getAuthorProfile } = require('../controller/authController')
const { authCheck, authCheck2 } = require('../middleware/authCheck')


router.get('/login', authCheck2, getLogin)
router.get('/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}))

router.get('/google/redirect', passport.authenticate('google'), googleRedirect)

router.get('/logout', getLogout)


router.get('/profile', getProfilePage)
router.get('/profile/:userId', getAuthorProfile)

module.exports = router