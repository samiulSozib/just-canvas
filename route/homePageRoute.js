const router = require('express').Router()
const { getHomePage } = require('../controller/homePageController')
const { authCheck } = require('../middleware/authCheck')

router.get('/', authCheck, getHomePage)

module.exports = router