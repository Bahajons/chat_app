const user = require('../routes/user')
const login = require('../routes/login')
const profile = require('../routes/profile')
const express=require('express')
const mongoose = require('mongoose')


module.exports = function (app) {
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }))
    app.use('/api/register', user)
    app.use('/api/login', login)
    app.use('/api/profile', profile)
    mongoose.set('strictQuery', false);
}