const user = require('../routes/user')
const login = require('../routes/login')
const profile = require('../routes/profile')
const news = require('../routes/news')
const express = require('express')
const mongoose = require('mongoose')


module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use('/api/register', user)
    app.use('/api/login', login)
    app.use('/api/profile', profile)
    app.use('/api/news', news)
    mongoose.set('strictQuery', false);
}