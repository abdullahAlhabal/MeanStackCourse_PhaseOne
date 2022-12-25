// this page only admin and users can access to it  
//* http://localhost:1234/dashboard/user              ==> access as users
//* http://localhost:1234/dashboard/user/admin        ==> access as admins  

const {authUser}    = require("../middleware/User");
const admin   = require("../middleware/admin");
const winston = require('winston');
const express = require('express');
const router  = express.Router();
 
router.get('/dashboard' , authUser ,  (req,res) => {
    winston.info("Dashboard Page");
    res.status(200).send("Dashboard Page \n  ");   
})
 

module.exports = router;