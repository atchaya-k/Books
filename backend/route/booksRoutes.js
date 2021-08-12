const express=require('express')
const asynchandler =require('express-async-handler')
const authMiddleware = require('../middleware/authMiddleware')
const Book=require('../models/Book')
const bookRouter=express.Router()

//create book
bookRouter.post('/',asynchandler (async(req,res)=>{
    const book=await Book.create(req.body)
    if(book){
        res.status(200)
        res.json(book)
    }else{
        res.status(500);
        throw new Error ('failed')
    }
}))

//fetch books--al books
bookRouter.get('/',asynchandler (async(req,res)=>{
    const book=await Book.find({})
    if(book){
        res.status(200)
        res.json(book)
    }else{
        res.status(500);
        throw new Error ('no boks')
    }
}))

//update
bookRouter.put('/:id',authMiddleware,asynchandler (async (req,res)=>{
  const book=await Book.findById(req.params.id)
  if(book){
      const updatedBook=await Book.findByIdAndUpdate(req.params.id,req.body,
        {new : true,
        runValidators : true})
    res.status(200)
    res.json(updatedBook)
    }
    else{
        res.status(500)
        throw new Error('no update')
    }
}))


//delete 
bookRouter.delete('/:id',asynchandler (async(req,res)=>{
    try{
        const book=await Book.findOneAndDelete(req.params.id)
        res.status(200)
        res.send(book)
    }
    catch(err){
        res.json(err)
    }
}))

module.exports=bookRouter;