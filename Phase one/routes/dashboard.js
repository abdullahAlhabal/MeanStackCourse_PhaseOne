// this page only admin and users can access to it  
//* http://localhost:1234/dashboard/user              ==> for users
//* http://localhost:1234/dashboard/user/admin        ==> for admins user 

const user    = require("../middleware/User");
const admin   = require("../middleware/admin");
const winston = require('winston');
const express = require('express');
const router  = express.Router();

router.get('/user' , user , (req,res) => {
    winston.info("Dashboard Page");
    res.status(200).send("Dashboard Page \n hello user ");   
})

router.get('/user/admin' , admin , (req,res) => {
    winston.info("Dashboard Page");
    res.status(200).send("Admin Dashboard Page \n hello user ");   
})

module.exports = router;