const winston = require('winston');

module.exports = async (err , req , res,next) => {
    winston.error(err.message , err);
    res.status(500).send(`Something went Wrong `);
}