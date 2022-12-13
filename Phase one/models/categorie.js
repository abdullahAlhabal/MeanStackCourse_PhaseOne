// load the modules 
const mongoose = require('mongoose');
const joi      = require('joi');

const categorieSchema = new monoose.schema({
    name :{
        type      : String,
        required  : true, 
        minlength : 3 , 
        maxlength : 100
    }
});


const Categorie = mongoose.model('Categorie' , categorieSchema);

function categorieValidation(categorie){
    const schema = joi.object({
        name     : joi.string().min(3).max(100).required() 
    })
    return schema.validate(categorie);
}

module.exports.validation = categorieValidation ;
module.exports.Categorie    = Categorie ;
