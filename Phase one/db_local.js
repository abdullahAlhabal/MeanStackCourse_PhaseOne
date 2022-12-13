/* 
 ! this module if we want to test our application in local storage not databases 
**/

const ROLE = {
    ADMIN : 'admin',
    BASIC : 'basic'

}

module.exports =  {
    ROLE     : ROLE , 
    users    : [
        { id : 1  , name : "abd"    , role : ROLE.ADMIN},
        { id : 2  , name : "khaled" , role : ROLE.BASIC},
        { id : 3  , name : "Ali"    , role : ROLE.BASIC}
    ] ,
    projects : [
        { id : 1 , name : " abd's    Project " , userId : 1 },
        { id : 2 , name : " Khaled's Project " , userId : 2 },
        { id : 3 , name : " Ali's    Project " , userId : 3 }
    ]

};