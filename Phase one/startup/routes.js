/* 
 ! this module is to require the routes modules and packages 
 load the module and packages 
 * npm i node nodemon express mongoose config morgan helmet winston joi joi-objectid
**/

/**
 * Imports 
 */
require(`express-async-errors`)
const express     = require('express');
const helmet      = require('helmet');
const morgan      = require('morgan');
const winston     = require('winston');


// Route imports
const home        = require(`../routes/home`)
const products    = require('../routes/products');
const categories  = require('../routes/categories');
const admin       = require('../routes/admin');
const order       = require('../routes/order');
const dashboard   = require('../routes/dashboard');

/**
 * Middleware
 */
const error   = require("../middleware/error");

module.exports = function(app)  {

    /**
     * Middleware
     */
    app.use(express.json());
    app.use(express.static('public'));
    app.use(express.urlencoded({ extened : true })) ;
    app.use(helmet());

    // Routes 
    app.use('/api/products'     , products   );
    app.use('/api/categories'   , categories );
    app.use('/api/admin'        , admin      );    
    app.use('/api/order'        , order      );
    app.use('/api/dashboard'    , dashboard  );
    app.use('/'                 , home       );

    // middelware
    app.use(error);

    if(app.get('env') === 'development'){
        app.use(morgan('tiny'));
        winston.info(`Morgan enabled ...`);
    }

    

};