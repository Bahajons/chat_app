const express = require('express');
const Joi = require('joi');
const router = express.Router()
const mongoose = require('mongoose')
const _ = require('lodash')
const bcrypt = require('bcrypt')
const { Users } = require("../models/user")
const jwt = require('jsonwebtoken')
const config = require('config')


router.post('/', async (req, res) => {
    const { error } = validateUsers(req.body);

    if (error)
        return res.status(400).send(error.details);

    let user = await Users.findOne({ email: req.body.email })
    if (!user)
        return res.send('This email is not registered')

    const isValidPassword = await bcrypt.compare(req.body.password, user.password)
    if (!isValidPassword)
        return res.send('Email or password is incorrect')

    const token = user.generateAuthToken();

    res.header('x-auth-token', token).status(200).send(JSON.stringify(_.pick(user, ['_id', 'name', 'email'])))
})

function validateUsers(user) {

    let schema = Joi.object({
        email: Joi.string().min(3).max(35).required(),
        password: Joi.string().min(5).required()
    })
    return schema.validate(user);
}

module.exports = router;