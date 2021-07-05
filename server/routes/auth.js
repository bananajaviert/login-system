import express from 'express'

// Models
import User from '../models/User.js'


import {register_controller, login_controller} from '../controllers/Auth.js'

const router = express.Router()

router.route('/').get((req, res) => {
    User.find()
    .then(user => res.json(user))
    .catch(err => res.status(400).json(`Error: ${err}`))
})

router.post('/register', register_controller)

router.post('/login', login_controller)

export {router}