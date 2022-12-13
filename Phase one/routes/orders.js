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

router.use(setUser);
router.use(setOrder);

// an admin can read all orders while a customer can only read his own orders.
router.get('/' ,setUser, async( req ,res) =>{
    const orders = await Order.find();
    res.send(scopedOrder ( req.user , orders));
}) ;

// Customers can create orders where each order has a list of products, status and total price => the request body have userId and list of products
router.post('/' , setUser , authUser , async (req,res) =>{  
    
    const { error } = validate(req.body);
    if(error){
        return res.status(400).send(`Error : \n ${error.details[0].message} \n`);
    }

    const user = await User.findById(req.body.userId);
    if(!user){
        return res.status(400).send(` user with id ["${req.body.userId}"] not found \n`);
    }

    const prodcuts = req.body.products;
    for( var _prodcut in prodcuts ){
        let p = await Product.findById(_prodcut.id);
        if(!p){
            return res.status(404).send(`prodcut with id : ${_prodcut.id} not found .... \n`) 
        }
    }

    let order = new Order({
        products : prodcuts ,
        user : {
            name    : user.name ,
            isAdmin : user.isAdmin
        },
        status : "pending" 
    });

    const session = new mongoose.startSession();
    session.startTransaction();

        //save the order
        order = await order.save();

        // Decrease the number of products 
        for( var _prodcut in prodcuts ){
            _prodcut.numberInStock -- ;
        }

        //save the product after decrease the numberInStock 
        for( var _prodcut in prodcuts ){
           _prodcut = await _prodcut.save(); 
        }

    await session.commitTransaction();
    await session.endSession();

    res.send(order);
});

router.put('/:orderId/:status' , setOrder ,async (req,res) =>{   
 // after we inject the setOrder middleware into the put request , so in the req we will have req.order 
 
    canChangeStatusOfAnOrder(req.order);

    const status = (req.params.status).toString();
    switch (status) {
        case 'accepted' : return res.status(200).send(` status updated to ${status} \n`); 
        case 'rejected' : return res.status(200).send(` status updated to ${status} \n`); 
        case 'canceled' : return res.status(200).send(` status updated to ${status} \n`); 
    }
    

});



// in order to update the status of the order , we need to use a function pass a order as an argument - implementation this middleware to do it 
function setOrder(req,res,next){
    try{
        const orderId = req.params.orderId ;
        if(orderId){
            req.order = Order.find( or => or.id === orderId);
        }
    }catch(err){
        return res.status(400).send(`Error : \n ${err.details[0].message} \n`);
    }
    next();
}

// in order to scoped Orders we need to use the scopedOrder(user,orders) function  :: implementation this middleware to put it in the get http request
function setUser(req, res , next )  {
    try {
        const userId = req.body.userId ;
        if(userId){
            req.user = User.find( user => user.id === userId );
        }    
    } catch (error) {
        return res.status(400).send(`Error : \n ${error.details[0].message} \n`);
    }
    next();
};

module.exports = router;
