import jwt from 'jsonwebtoken'

export const verify_token = async (req, res, next) => {
    const token = await req.header('auth-token')
    if(!token) return res.status(401).json({message: 'Access Denied'})

    try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
        req.user = verified
        next()
    } catch(error) {
        res.status(403).json({message: `Forbidden`})
    }
}