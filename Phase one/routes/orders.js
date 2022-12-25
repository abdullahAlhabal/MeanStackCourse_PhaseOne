/* 
 ! this module is to create a order by the user and update them with a specific permissions - user can create the order 
 load the module and packages 
 * npm i express   
**/
const mongoose              = require('mongoose');                              // we required mongoose in order to use session 
const winston               = require('winston');
const express               = require('express');
const authUser              = require("../middleware/User");
const { Order , validate}   = require("../models/orders");
const { User }              = require('../models/user');
const { Product }           = require('../models/product');
const { scopedOrder , canChangeStatusOfAnOrder }       = require('../permissions/orders');
const router                = express.Router();
try{
    
}catch(err){
    console.log(`Error : \n ${err.message}  \n order module \n`);
}


module.exports = router;
