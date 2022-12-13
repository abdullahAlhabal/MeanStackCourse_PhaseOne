// this page only admins can access to it 

const admin   = require('../middleware/admin');  
const winston = require('winston');
const express = require('express');
const router  = express.Router();

router.get('/' , admin , (req,res) => {
    winston.info("admin page");
    res.status(200).send("Admin Page \n hello user ");   
})

module.exports = router;