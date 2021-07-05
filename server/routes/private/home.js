import express from 'express'
import {verify_token} from '../token.js'

const router = express.Router()

router.get('/home', verify_token, async (req, res) => {
    try {
        const data = await res.json('This will show once you logged in successfully')
    } catch(error) {
        res.status(403).json(error)
    }
})

export {router}