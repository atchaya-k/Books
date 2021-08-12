const mongoose=require('mongoose')
const key=require('../utils/keys')
const dbConnect=()=>{
//connect to db
//mongodb+srv://atchaya:<password>@books.mja6f.mongodb.net/test
mongoose.connect(
    key.MONGO_URL,{
    useFindAndModify : true,
    useUnifiedTopology : true,
    useCreateIndex : true,
    useNewUrlParser : true
})
.then(()=>{ console.log('db connected')})
.catch(err => {console.log(err)})

}

module.exports=dbConnect