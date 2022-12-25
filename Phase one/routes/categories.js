/**
 * the target of the module : 
 * this module to CRUD the categories with admin permissions - user and visitors can only perform read operations on categorie
 */
const express                    = require('express');
const { Categorie , validation } = require('../models/categorie');
const admin                      = require('../middleware/admin');
const {authUser}                  = require('../middleware//User');
const auth                       = require('../middleware/auth');
const router                     = express.Router();


// Anonymous visitors and customers can only perform read operations on categories and products :: in order to do that , we don't pass any middleware to the get router in category and product routes
router.get('/' , async (req,res) =>{
    const categories = await Categorie.find();
    res.send(`Categorie : \n ${categories} \n `)
});

router.get('/:categoryId' , async (req,res) =>{  
    const category = await Categorie.findById(req.params.categoryId);  
    if(!category) {
        return res.status(404).send(`category with id [" ${req.params.categoryId} "] not found \n`);
    }

    res.send(category)
});

router.post('/'  , async (req,res) =>{   

    const {error} = validation(req.body);
    if(error){
        return res.status(400).send(`Error : \n ${error.details[0].message} \n`)
    }
    
    let category = new Categorie({
        name : req.body.name 
    });

    category = await category.save();
    res.send(category);
});
 
router.put('/:categoryId' ,  async (req,res) =>{  

    const {error} = validation(req.body);
    if(error){
        return res.status(400).send(`Error : \n ${error.details[0].message} \n`)
    }

    const category = await Categorie.findByIdAndUpdate(req.params.categoryId , {
        $set : {
            name : req.body.name
        }
    } , {new : true})
    // we use the third parameter {new : true} to return the new save of the category
    
    if(!category){
        return res.status(404).send(`category with id ["${req.params.categoryId}"] not found \n`);
    }

    res.send(category)


});

router.delete('/:categoryId' ,async (req,res) =>{   
    const category = await Categorie.findByIdAndRemove(req.params.categoryId);
    if(!category){
        return res.status(404).send(`category with id ["${req.params.categoryId}"] not found \n`);
    }
    res.send(category);
});

    

module.exports = router;
