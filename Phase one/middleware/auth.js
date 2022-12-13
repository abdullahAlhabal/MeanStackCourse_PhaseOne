const jwt     = require('jsonwebtoken');
const winston = require('winston')

module.exports = function (req,res,next){
    const token = req.header('x-auth-token');
    if(!token){
        res.status(401).send("Access denied , invalid token\n");
    }

    req.user = jwt.decode(token , config.get('jwtPrivateKey') );
    if(!req.user){
        res.status(401).send("Access denied , invalid token\n");
    }

    winston.info(req.user)
    next();

}