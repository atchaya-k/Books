const jwt =require('jsonwebtoken')
const key=require('./keys')
const generateToken=(userId)=>{
    return jwt.sign({id : userId},key.JWT_SECRET_key,{
        expiresIn : '30d',
    })
}
module.exports=generateToken;