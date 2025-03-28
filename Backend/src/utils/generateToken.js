import jwt from 'jsonwebtoken'

export const generateToken = (userId, res) => {
    const token = jwt.sign({userId}, process.env.JWT_TOKEN, { expiresIn: '90d'})

    res.cookie('jwt', token, {
       httpOnly: true,
       secure: process.env.NODE_ENV !== "production",
       sameSite: 'strict'
    })
}