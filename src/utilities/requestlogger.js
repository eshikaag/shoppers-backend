const fs = require('fs')
let reqLogger = (req,res,next)=>
{
    let logMsg=""+ new Date()+" "+req.method+" "+req.url+" ";
    fs.appendFile('RequestLogger.txt', logMsg,function(err){
        if(err)
        {
            return next(err)
        }
    })
next()
}
module.exports=reqLogger;