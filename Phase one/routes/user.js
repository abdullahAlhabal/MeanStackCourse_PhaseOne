/* 
 * the target of the module : 
 ! this module to create a user using name email password and isAdmin properties  
 * provide endpoints for registering and authenticating users.   => here to registering new users
 
 load the module and packages ::
 * npm i express bcrypt lodash 
**/

const bcrypt                = require('bcrypt');
const _                     = require('lodash');
const express               = require('express');
const { User , validation}  = require('../models/user');
const router                = express.Router();

// create the http request 
router.post('/' , async (req,res) => {

    // validate the request : name - email - password - isAdmin
    const { error } = validation(req.body);
    if(error){
        return res.status(400).send(`Error :\n ${error.details[0].message} \n `);
    }

    // check if the email is uniqur -- if not send message 
    const user = await User.findOne({ email : req.body.email}) 
    if(user){
        return res.status(404).send( ` email already exists`);
    }

    // create a new user - get the values from the req body to new user by pick() function in lodash package 
    user = new User(_.pick( req.body , [ "name" , "email"  ,"password"  ]));

    // if the email is unique , get the password , hash the password and then save it - create the salt - hash the password - save the password and salt - bcy
    const salt    = await bcrypt.genSalt(10)       // number of rounds bydefault 
    user.password = await bcrypt.hash(user.password, salt);
    
    // so then , save the user and send the data bask , without password 
    user = await user.save();
    res.status(200).send( _.pick( user , [ "_id" , "name" , "email" ]));

} )  ;

// exports the router 
module.exports = router ;