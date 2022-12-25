/**  
 *  Admins can CRUD products and each product has a category, name, description (optional), price and the availability in stock.
 * load the modules
 */ 
require('joi-objectid');
const mongoose = require('mongoose');
const joi      = require('joi');
const { Categorie } = require("./categorie");
// embeddings , link the categories with thea categorie property in prodcut

const categorieSchema = new mongoose.Schema({
    name :{
        type      : String,
        required  : true, 
        minlength : 3 , 
        maxlength : 100
    }
});

const productSchema = new mongoose.Schema({
    name :{
        type      : String,
        required  : true, 
        minlength : 3 , 
        maxlength : 100
    },
    category :{
        /*type: mongoose.Schema.Types.ObjectId,
        ref : 'Categorie'*/
        type : String,
        required : true,
        min : 0 , 
    },
    description : {
        type : String ,
        minlength : 25 , 
        maxlength : 1000,
    },
    price : {
        type        : Number,
        required    : function() { return this.isAvailable },
        min         : 0 , 
        max         : 10000,
        get      : v => Math.round(v),  
        set      : v => Math.round(v)  
    },
    isAvailable : {
        type :Boolean ,
        default : function() { return this.inStock > 0 },
        
    },
    inStock : {
        type        : Number,
        required    : true, 
        min         : 0 , 
        max         : 100
    }
})


const Product = mongoose.model('Product' , productSchema);




function productValidation(produc){
    const schema = joi.object({
        name          : joi.string().min(3).max(100).required(),
        category      : joi.string().min(0).required(),
        description   : joi.string().min(25).max(1000),
        price         : joi.number().min(0).max(1000).required(),
        inStock       : joi.number().min(0).max(100).required()
    })
    return schema.validate(produc);
}

module.exports.validation   = productValidation;
module.exports.Product    = Product ;
