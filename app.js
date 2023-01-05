require('dotenv').config()

const express = require('express')
const cookieSession = require('cookie-session')
const mongoose = require('mongoose')
const http = require('http')
const passport = require('passport')
const passportSetup = require('./config/passport-config')


const setMiddlewares = require('./middleware/middlewares')
const setRoutes = require('./route/routes')



const app = express()
const server = http.createServer(app)




app.set('view engine', 'ejs')
app.set('views')

app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['sumaiya_sadia']
}))

app.use(passport.initialize())
app.use(passport.session())

setMiddlewares(app)
setRoutes(app)



const PORT = process.env.PORT || 1000
const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD
const DB_NAME = process.env.DB_NAME

// mongoose.connect(`mongodb+srv://sumaiya:sadia@cluster0.wfp3rjc.mongodb.net/just-campus-magazine?retryWrites=true&w=majority`, { useNewUrlParser: true, useUnifiedTopology: true })
//     .then(() => {
//         console.log('Database connect success')
//         server.listen(PORT, () => {
//             console.log('Server Is Ready')
//         })
//     }).catch(e => {
//         return console.log(e)
//     })

mongoose.connect(`mongodb://localhost:27017/just-campus-magazine`, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Database connect success')
        server.listen(PORT, () => {
            console.log('Server Is Ready')
        })
    }).catch(e => {
        return console.log(e)
    })