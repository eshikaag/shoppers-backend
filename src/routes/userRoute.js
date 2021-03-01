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
            res.json({"message":"reg successful with userid"+userId})
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


routing.get('/categoryproducts/:category',async(req,res,next)=>
{
let category=req.params.category
try
{
    let data=await service.getspecificproducts(category)
    if(data)
    {
        console.log("categspeiciroute",data)
        res.json(data)
    }
}
catch(e)
{
    next(e)
}
})


routing.post('/addItem/:email',async(req,res,next)=>
{
let prod=req.body
let email=req.params.email
try{
    let result=await service.addItem(email,prod)
    if(result)
    {
  console.log("add item route",result)
  res.json(result)        
    }
}
catch(e)
{
    next(e)
}
})

routing.get('/getAllProducts/:email',async(req,res,next)=>
{
    let email=req.params.email
    try{
        let data=await service.getAllProducts(email)
        res.json(data)
    }
    catch(e)
    {
        next(e)
    }
})
routing.delete('/removeProduct/:email/:id',async(req,res,next)=>
{
    console.log("route rem")
    let {email,id}=req.params
    try{
        let data=await service.removeProd(email,id)
        res.json(data)
    }
    catch(e)
    {
        next(e)
    }
})


routing.put('/updateQuantity',async(req,res,next)=>
{
    let id=req.body.pid
    let email=req.body.email
    let quantity=req.body.quantity
    try
    {
console.log("route",email,id,quantity)
let data=await service.updateQuantity(id,email,quantity)
res.json(data)
    }
    catch(e)
    {
        next(e)
    }
})



module.exports=routing