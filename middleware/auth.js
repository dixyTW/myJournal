const config = require('config')
const jwt = require('jsonwebtoken');

function auth(req, res, next) { 
    //purpose:get token sent from frontend
    const token = req.header('x-auth-token');

    if(!token) {
        res.status(401).json({ msg: 'no token, authorization denied'})
    }

    try {
        const decoded = jwt.verify(token, config.get('jwtSecret'))
    
        req.user = decoded;
        next();
    } catch(e) {
        res.status(400).json({msg:'token invalid'})
    }

    
}

module.exports = auth;