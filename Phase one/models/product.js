/**  
 *  Admins can CRUD products and each product has a category, name, description (optional), price and the availability in stock.
 * load the modules
 */ 
const mongoose = require('mongoose');
const joi      = require('joi');

// embeddings , link the categories with the categorie property in prodcut
const categorieSchema = new mongoose.schema({
    name :{
        type      : String,
        required  : true, 
        minlength : 3 , 
        maxlength : 100
    }
});

const productSchema = new mongoose.schema({
    name :{
        type      : String,
        required  : true, 
        minlength : 3 , 
        maxlength : 100
    },
    category :{
        type : categorieSchema                              // relation
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
    numberInStock : {
        type        : Number,
        required    : true,
        min         : 0 , 
        max         : 1000
    },
    isAvailable : {
        type :Boolean
    }
})



const Product = mongoose.model('Product' , productSchema);

function productValidation(product){
    const schema = joi.object({
        name          : joi.string().min(3).max(100).required(),
        category      : joi.required(),
        description   : joi.string().min(25).max(1000),
        price         : joi.number().min(0).max(1000).required(),
        numberInStock : joi.number().min(0).max(100).required(),
    })
    return schema.validate(product);

}

module.exports.validation = productValidation ;
module.exports.Product    = Product ;
