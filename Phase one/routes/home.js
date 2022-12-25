// this page admins - users - and visitors  can acccess to it 

const winston = require('winston');
const express = require('express');
const router  = express.Router();
 
router.get('/' , (req,res) => {
    winston.info("Home Page");
    res.status(200).send("Home Page \n Hello World!!! ");   
})   

module.exports = router;