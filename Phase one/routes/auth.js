/**
 * this module to auth the users by thier email and password
 ** provide endpoints for registering and authenticating users.   => here to authenticating users
 ** 

*/
// load the module 
const express  = require('express');
const joi      = require('joi');
const { User } = require('../models/user'); 
const winston  = require('winston');
const bcrypt   = require('bcrypt');
const router   = express.Router();  

// use async function cuze we use find()
// this http request don't need any type of permissions - any visitor would be a user 
router.get('/' ,async (req,res)=>{

    // check  unvalidated requests  
    const { error } = validate(req.body);
    if(error){
        return res.status(400).send(`Error : ${error.details[0].message} \n`)
    } 

    // check if any user carry the same email 
    const user =  await User.findOne({ email : req.body.email});
    if(!user) {
        return res.status(404).send(`Invalid username or password`);
    }

    // check if the request's password match the user password using the bcrypt compare function
    // the way is : hash the request's password in the same hash function with the salt - then compare the two passwords - async operation need await 
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword){
        return res.status(404).send(`Invalid username or password`);
    }

    // the user is authUser - generate the token to send it back with id and isAdmin field only using pick from the lodash package
    const token = user.generateAuthToken();
    winston.info(" Auth Completed ");
    res.send(token);
});

function validate( request){
    const schema = joi.object({
        email    : joi.string().min(11).max(255).required().email() , 
        password : joi.string().min(8).max(1024).required()
    });
    return schema.validate(request);

}

module.exports = router ;
