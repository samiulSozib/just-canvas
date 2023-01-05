const express = require('express')
const morgan = require('morgan')
const setLocals = require('./setLocals')


const middlewares = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({ extended: true }),
    express.json(),
    setLocals()
]

module.exports = (app) => {
    middlewares.forEach(m => {
        app.use(m)
    })
}