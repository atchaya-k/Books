const mongoose=require('mongoose')

const dbConnect=()=>{
//connect to db
//mongodb+srv://atchaya:<password>@books.mja6f.mongodb.net/test
mongoose.connect('mongodb+srv://atchaya:9080483221@books.mja6f.mongodb.net/test',{
    useFindAndModify : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useNewUrlParser : true
})
.then(()=>{ console.log('db connected')})
.catch(err => {console.log(err)})

}

module.exports=dbConnect