const express=require('express')
const asyncHandler=require('express-async-handler')
const User=require('../models/User')
const generateToken = require('../utils/generateTokens')
const usersRoute=express.Router()
const authMidddleware=require('../middleware/authMiddleware')

//req.body-->contains data coming into the route handler
//register
usersRoute.post(
    '/register',
    asyncHandler(async (req,res)=>{
const {name,email,password}=req.body
const userExist=await User.findOne({email : email})
if(userExist){
   throw  new Error('User Exists')
}
const userCreated=await User.create({name,email,password})
res.json({
    _id: userCreated._id,
    name : userCreated.name,
    email: userCreated.email,
    password : userCreated.password,
    token : generateToken(userCreated._id)
})
}))

//login
usersRoute.post(
    '/login'
    ,asyncHandler (async(req,res)=>{
   const {email,password}=req.body
   const user=await User.findOne({email})
   const pass=await user.isPasswordMatch(password)
   console.log(pass)
   if(user || pass){
       res.status(200)
       res.json({
           _id: user._id,
           name : user.name,
           email: user.email,
           password : user.password,
           token : generateToken(user._id)
       })
   }
   else{
       res.status(401)
       throw new Error('Invalid')
    }
}))

//update user
usersRoute.put(
    '/update',
    authMidddleware,
    asyncHandler(async (req, res) => {
      //Find the login user by ID
      const user = await User.findById(req.user._id);
  
      if (user) {
        user.name = req.body.name || user.name;
        user.email = req.body.email || user.email;
        if (req.body.password) {
          user.password = req.body.password || user.password;
        }
  
        const updatedUser = await user.save();
  
        res.json({
          _id: updatedUser._id,
          name: updatedUser.name,
          email: updatedUser.email,
          token: generateToken(updatedUser._id),
        });
      }
    })
  );
//delete user
usersRoute.delete('/:id',(req,res)=>{
    res.send('delete')
})

//fetch users
usersRoute.get('/',authMidddleware,(req,res)=>{
    console.log(req.headers)
    res.send(req.user)
})


module.exports=usersRoute