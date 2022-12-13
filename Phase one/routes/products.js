/* 
 ! this module to CRUD the products with admin permissions - user and visitors can only perform read operations on products
 load the module and packages 
 * npm i express 
**/
const express = NodeRequire('express');
const { Product , validation }   = require('../models/product');
const admin                      = require('../middleware/admin');
const auth                       = require('../middleware/auth');
const router = express.Router();

// Anonymous visitors and customers can only perform read operations on categories and products :: in order to do that , we don't pass any middleware to the get router in category and product routes
router.get('/' , async (req,res) =>{
    const products = await Product.find();
    res.send(`products : \n ${products} \n `)
});
// we can scoped products if we want by use a function  -- i will put it after the module.exports  


router.get('/:productId' , async (req,res) =>{  
    const product = await Product.findById(req.params.productId);  
    if(!product) {
        return res.status(404).send(`product with id ["${req.params.productId}"] not found \n`);
    }

    res.send(product)
});

router.post('/' , [admin]  , async (req,res) =>{   

    const {error} = validation(req.body);
    if(error){
        return res.status(400).send(`Error : \n ${error.details[0].message} \n`)
    }
    
    let product = new Product({
        name : req.body.name 
    });

    product = await product.save();
    res.send(product);
});
 
router.put('/:productId' ,admin , async (req,res) =>{  

    const {error} = validation(req.body);
    if(error){
        return res.status(400).send(`Error : \n ${error.details[0].message} \n`)
    }

    const product = await Product.findByIdAndUpdate(req.params.productId , {
        $set : {
            name : req.body.name
        }
    } , {new : true})
    // we use the third parameter {new : true} to return the new save of the product
    
    if(!product){
        return res.status(404).send(`product with id ["${req.params.productId}"] not found \n`);
    }

    res.send(product)


});

router.delete('/:productId' , admin ,async (req,res) =>{   
    const product = await Product.findByIdAndRemove(req.params.productId);
    if(!product){
        return res.status(404).send(`product with id ["${req.params.productId}"] not found \n`);
    }
    res.send(product);
});

module.exports = router;



/**
 *! for scoped product or items 
 * if a specific user have a specific product 
 * so in the permissions module put the function 
 * 
 ** 
 
 **         function scopedProduct (user , products){
 **             if(user.role === ROLE.ADMIN) {
 **                  return products;
 **             }
 **             return products.filter( Product => Product.userId === user.id );
 **         }

 *  then import the function from the permission module 7
 **         const { scopedProduct } = require("../permissions/Product");

 * and use the function inside the http get request

 **        app.get("/" , (req,res) => { 
 **        
 **   
 } );
 */