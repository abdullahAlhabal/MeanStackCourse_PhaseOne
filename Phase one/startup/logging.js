const winston = require('winston');
require('winston-mongodb');

module.exports = function(){

    winston.add( new winston.transport.File({ filename : '../logs/logFile.log'}));
    winston.add (new winston.transport.Console());
    winston.add( new winston.transport.MongoDB({ db : ''}));

    winston.exceptions.handle(
        new winston.transport.File({ filename : '../logs/unhandledExceptions.log'}), 
        new winston.transport.Console()
    );
};
