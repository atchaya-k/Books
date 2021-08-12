const asynchandler=require('express-async-handler')
const jwt=require('jsonwebtoken')
const key=require('../utils/keys')
const User=require('../models/User')
const authMiddleware=asynchandler (async(req,res,next)=>{
    let token;

  
   if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
       try{
           token=req.headers.authorization.split(' ')[1]
        
           const decoded=jwt.verify(token,key.JWT_SECRET_key)
           console.log(decoded)
           const user=await User.findById(decoded.id)
           console.log(user)
           req.user=user
           next()
        }
        catch(err){
                res.status(401)
                throw new Error('not authorised')
        }
   }
})

module.exports=authMiddleware
