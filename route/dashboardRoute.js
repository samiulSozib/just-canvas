const router = require('express').Router()
const { getDashboardController } = require('../controller/dashboardController')
const { authCheck2 } = require('../middleware/authCheck')

router.get('/', authCheck2, getDashboardController)

module.exports = router