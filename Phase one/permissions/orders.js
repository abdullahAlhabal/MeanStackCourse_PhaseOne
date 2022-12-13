/** 
 *! for the last line in the phase 1
 ** - An admin can read all orders while a customer can only read his own orders. 
 **/


function canViewOrder (user, order){
    return (  user.isAdmin || order.userId === user.id ) 
}

function scopedOrder (user, orders){
    if(user.isAdmin){
        return orders;
    }
    return orders.filter( order => order.userId === user.id );
}



function canChangeStatusOfAnOrder( order ){
    if(! order.status === "pending"){
        return res.status(403).send(`Access Denied , can't change the status of an order if it isn't in the pending status \n`)
    }
} 

module.exports = {
    canViewOrder,
    scopedOrder,
    canChangeStatusOfAnOrder
}
 

