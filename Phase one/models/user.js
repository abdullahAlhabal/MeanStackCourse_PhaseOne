// load the modules 
const mongoose = require('mongoose');
const config   = require('../config/default');
const joi      = require('joi');
const jwt      = require('jsonwebtoken')
mongoose.set('strictQuery', true);

const userSchema = new mongoose.Schema({
    name :{
        type      : String,
        required  : true, 
        minlength : 3 , 
        maxlength : 30
    },
    email  : {
        type       : String ,
        required   : true, 
        minlength  : 11 , 
        maxlength  : 255
    },
    password : {
        type      : String ,
        required  : true, 
        minlength : 8 , 
        maxlength : 1024
    },
    isAdmin : {
        type : Boolean,
        default : false         
    }
})
// add the email and the password to the schema in order to do :  registering and authenticating users.

userSchema.methods.generateAuthToken = function () {
    return jwt.sign( { _id : this._id , isAdmin : this.isAdmin } , config.jwtPrivateKey  )
}

// how we can git the private key of jwt 
// [1]. by config ==>   config.get('jwtPrivateKey);
// [2]. by .env  ==>    process.env.JWTPRIVATEKEY; 
// and the two file will inclode in .gitignore file before host them 

const User = mongoose.model('User' , userSchema);

function userValidation(user){
    const schema = joi.object({
        name     : joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required() ,
        
        email    : joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
          })
        .required(), 

        password : joi.string()
        .min(8)
        .max(1024)
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required()
        .messages({
            "string.pattern.base" : `Password should be between 3 to 30 characters and contain letters or numbers only`,
            "string.empty"        : `Password cannot be empty`,
            "any.required"        : `Password is required`,
          }),
        
        isAdmin  : joi.boolean() 
    })
    return schema.validate(user);
}

module.exports.validation = userValidation ;
module.exports.User       = User ;
