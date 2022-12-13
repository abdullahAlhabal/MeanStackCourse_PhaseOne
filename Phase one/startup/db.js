/* 
 ! this module is to create a connect with the databases and show the error message if the connectin not completed
 load the module and packages 
 * npm i  
**/

const mongoose = require('mongoose');
const winston  = require('winston');

module.exports = function () {
    mongoose.connect("mongodb://127.0.0.1:27017/" , { useNewUrlParser : true , useUnifiedTopology : true  }  )
    .then( () => winston.info(`Successfully Connected to Mongo DataBase `) )
};

// I use the mongoDBCompass in my machine  ==> 127.0.0.1 === localhost 