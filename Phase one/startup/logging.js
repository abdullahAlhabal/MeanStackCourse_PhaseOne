const winston   = require('winston');
                  require('winston-mongodb');
const path      = require('path');
    
// Set this to whatever, by default the path of the script.
const logPath = "./log";
const tsFormat = () => (new Date().toISOString());
    
const errorLog = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: path.join( logPath, 'errors.log'),
            timestamp: tsFormat,
            level: 'info'
        })
    ]
});
    
const accessLog = winston.createLogger({
    transports: [
        new winston.transports.File({
            filename: path.join(logPath, 'access.log'),
            timestamp: tsFormat,
            level: 'info'
        })
    ]
});
      
    
module.exports = {
    errorLog: errorLog,
    accessLog: accessLog
};

/** 
const winston = require('winston');
require('winston-mongodb');

module.exports = function () {
    winston.add( new winston.transport.File({filename : 'logFile.log'}));
    winston.add( new winston.transport.Console());
    winston.add( new winston.transport.MongoDB({ db : ''}));
    
    winston.exceptions.handle(
        new winston.transport.File({filename : 'unhandledExceptions.log'}),
        new winston.transport.Console()
    );
};
*/