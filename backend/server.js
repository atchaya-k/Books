const express=require('express')
const error=require('./middleware/errorMiddlewareHandler')
const usersRoute=require('./route/usersRoute')
const dbConnect=require('./config/dbConnect')
const app=express()
// console.log(app)

//express does not have feature to send incoming data 
//so use middleware it runs before the handler req,res
/////////passing body data///////
app.use(express.json())

//error
app.use(error.errorMiddleWareHandler)
//DB connect
dbConnect()

app.use('/api/users',usersRoute);


const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`run ${PORT}`)
})