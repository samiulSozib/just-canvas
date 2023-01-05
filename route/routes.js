const authRoute = require('./authRoute')
const homePageRoute = require('./homePageRoute')
const postPageRoute = require('./postRoute')
const dashboardRoute = require('./dashboardRoute')
const apiRoute = require('../api/routes/apiRoutes')
const adminRoute = require('./adminRoute')
const editorRoute = require('./editorRoute')



const routes = [{
        path: '/admin',
        handler: adminRoute
    },
    {
        path: '/editor',
        handler: editorRoute
    },
    {
        path: '/post',
        handler: postPageRoute
    },
    {
        path: '/auth',
        handler: authRoute
    },
    {
        path: '/home',
        handler: homePageRoute
    },
    {
        path: '/api',
        handler: apiRoute
    },
    {
        path: '/',
        handler: dashboardRoute
    }
]

module.exports = (app) => {
    routes.forEach(r => {
        if (r.path == '/') {
            app.get(r.path, r.handler)
        } else {
            app.use(r.path, r.handler)
        }
    })
}