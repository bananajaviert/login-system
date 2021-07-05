import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

import {register_validation, login_validation} from '../routes/validation.js'

import User from '../models/User.js'

export const register_controller = async (req, res) => {
    // Joi validation
    const {error} = register_validation(req.body)
    if(error) return res.status(400).json(error.details[0].message)

    const email_exists = await User.findOne({email: req.body.email})
    if(email_exists) return res.status(400).json('Email already exists')

    const salt = await bcrypt.genSalt(10)
    const hashed_password = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashed_password
    })

    try {
        await user.save()
        res.json('Created an account')
    } catch(error) {
        res.status(400).json(`Error: ${error}`)
    }
}

export const login_controller = async (req, res) => {
    // Joi validation
    const {error} = login_validation(req.body)
    if(error) return res.status(400).json(error.details[0].message)

    const user = await User.findOne({email: req.body.email})
    if(!user) return res.status(400).json('Account does not exists')

    const verify_password = await bcrypt.compare(req.body.password, user.password)
    if(!verify_password) return res.status(400).json('Invalid password')
    
    try {
        const token = jwt.sign({_id: user._id}, process.env.ACCESS_TOKEN_SECRET)
        res.header('auth-token', token).json({
            message: `Successfully logged in`,
            token
        })
    } catch(error) {
        res.status(400).json(`Error: ${error}`)
    }
}