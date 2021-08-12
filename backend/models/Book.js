const mongoose=require('mongoose')
const bcrypt =require('bcryptjs')

const bookSchema=new mongoose.Schema({
    category :{
        type : String,
        required : [true, 'Book category is Required']
    },
    author:{
        type : String,
        required: true
    },
    title :{
        type : String,
        required : true,
    },
    createdBy :{
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true,
    },
},
    {
        timestamps : true,
    }
)

const Book=mongoose.model('Boook',bookSchema)

module.exports=Book;