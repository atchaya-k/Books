const express=require('express')
// const dotenv=require('dotenv')
const error=require('./middleware/errorMiddlewareHandler')
const usersRoute=require('./route/usersRoute')
const booksRoute=require('./route/booksRoutes')
//env
// dotenv.config()
const dbConnect=require('./config/dbConnect')
const app=express()
// console.log(app)



//express does not have feature to send incoming data 
//so use middleware it runs before the handler req,res
/////////passing body data///////
app.use(express.json())

//error
app.use(error.errorMiddleWareHandler)

// console.log(process.env)
//DB connect
dbConnect()

//route
app.use('/api/users',usersRoute);
//books route
app.use('/api/books/',booksRoute)

const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`run ${PORT}`)
})