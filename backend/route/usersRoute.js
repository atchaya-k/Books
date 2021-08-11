const express=require('express')
const asyncHandler=require('express-async-handler')
const User=require('../models/User')
const usersRoute=express.Router()

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
res.send(userCreated)
}))

//login
usersRoute.post(
    '/login'
    ,asyncHandler (async(req,res)=>{
   const {email,password}=req.body
   const user=await User.findOne({email})
   if(user && (await user.isPasswordMatch(password))){
       res.status(200)
       res.json({
           _id: user._id,
           name : user.name,
           email: user.email,
           password : user.password
       })
   }
   else{
       res.status(401)
       throw new Error('Invalid')
    }
}))

//update user
usersRoute.put('/update',(req,res)=>{
    res.send('update')
})
//delete user
usersRoute.delete('/:id',(req,res)=>{
    res.send('delete')
})
//fetch users
usersRoute.get('/',(req,res)=>{
    res.send('users')
})


module.exports=usersRoute