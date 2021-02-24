const express=require('express')
const routing=express.Router()
const service=require('../service/userService')
const NewUser=require('../model/newUser')
routing.post('/register',async(req,res,next)=>
{
    try{
        console.log("reg route",req.body)
        let user=new NewUser(req.body)
        let userId=await service.register(user)
        console.log("haa agyi")
        if(userId)
        {
            console.log("response",userId)
            res.json({"message":"reg successful"})
            res.status(200)
        }
    }
    catch(e)
    {
        next(e)
    }
})

routing.post('/login',async(req,res,next)=>
{
    console.log("routing login",req.body)
try
{
    let uid=await service.login(req.body)
    if(uid)
    {
        console.log("logged in")
        res.json({"message":"successfully logged in with"+uid})
    }

}
catch(e)
{
    next(e)
}
}
)



module.exports=routing