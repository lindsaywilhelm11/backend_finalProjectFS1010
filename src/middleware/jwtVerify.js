import * as jwt from 'jsonwebtoken';

export default (req, res, next) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) {
        return res.status(403).send({message: "token not found"})
    }
    try {
        const data = jwt.verify(token, `${process.env.PRIVATEKEY}`)
        req.user = data
        next()
    } catch (err) {
        console.error(err)
        return res.status(401).send({message: err.message})
    }
};