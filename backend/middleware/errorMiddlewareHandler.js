const errorMiddleWareHandler=(err,req,res,next)=>{
   const errorStatusCode=res.statusCode === 200 ? 500 : res.statusCode;
   res.status(errorStatusCode)
   console.log('err',err.message)
   res.json({
      message: err.message,
   })
}
module.exports ={ errorMiddleWareHandler}