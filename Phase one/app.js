/* 
 ! this module to start our node application 
 load the module and packages 
 * npm init -y 
 * npm i node nodemon express mongoose config morgan helmet winston joi joi-objectid
**/

const winston      = require('winston');
const express      = require(`express`);
const app          = express();
const logger       = require('./startup/logging');

require('./startup/routes')(app);
require("./startup/db")();

/**
 * Start server
 */
const port         = process.env.PORT || 1234;
app.listen(
    port,
    () => console.log(`live now ... ,\n listening on port http://localhost:${port} click the link `));
    