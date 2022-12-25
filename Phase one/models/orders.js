const mongoose = require('mongoose');
const joi       = require('joi');
mongoose.set('strictQuery', true);
const orderSchema = new mongoose.Schema({

    user     :  new mongoose.Schema({
                    name :{
                        type      : String,
                        required  : true, 
                        minlength : 3 , 
                        maxlength : 100
                    },
                    isAdmin : {
                        type : Boolean,
                        default : false         
                    }
    }),
    // list of products 
    products : {
        type : [
            new mongoose.Schema({
                name :{
                    type      : String,
                    required  : true, 
                    minlength : 3 , 
                    maxlength : 100
                },
                price : {
                    type        : Number,
                    min         : 0 , 
                    max         : 10000,
                    get         : v => Math.round(v),  
                    set         : v => Math.round(v)  
                },
                numberInStock : {
                    type        : Number,
                    required    : true,
                    min         : 0 , 
                    max         : 1000
                }
            })],
        validate : {
            validator : function(value){
                return value && value.length> 0;

            },
            message : " Products should have at least one item "
        }
    },

    status : {
        type     : String , 
        enum      : [ "pending" , "accepted" , "rejected" , "canceled"]
    },

    totalPrice : {
        type     : Number ,
        value    : function() { for(var product in this.products){
            price += product.price ;
        }
        }
    },
    dateOut  : {
        type     : Date,
        required : true ,
        default  : Date.now
    }
})

const Order = mongoose.model('Order',orderSchema);



function orderValidation(order){

    const schema = joi.object({
        // i don't know if it true but - we send a list of products so the productId should be list of IDs so after search i found keys({})
        products : joi.keys({
            productId : joi.ObjectId().required()
        }), 
        userId : joi.ObjectId().required()
    });

    return schema.validate(order);
}

module.exports.validate = orderValidation;
module.exports.Order    = Order;