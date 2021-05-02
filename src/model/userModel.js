const { Collection } = require('mongoose')
const connection = require('../utilities/connection')
let user={}

// user.generateOrderId=async()=>
// {
  
// }



user.register=async(data)=>
{

    console.log("model reg",data.userDetails)
    const conn=await connection.getConnection()
    console.log("emiaail id",data.userDetails.email)
  
    const emailVerify=await conn.find({"email":data.userDetails.email})//////
    const e=await conn.find({},{_id:0})
    // console.log(e)
    // console.log("hahaaa",emailVerify)
    if(emailVerify.length==0)
    {
        console.log("step1")
        data.userDetails.userId="1002";//chkkkkkkkkkkkkkk
        console.log("model reg2",data.userDetails)
        try{
            console.log("step2")
            console.log(data.userDetails.userId)
            console.log(data.userDetails.userName)
            console.log(data.uCart)
            const newUser=await conn.create(data.userDetails)////////
            console.log("newwww",newUser)
            if(newUser)
            {
                console.log("step3")
                return data.userDetails.userId;
            }
        }
        catch(error)
        {
         let err=new Error("err in creating user")
         err.stack=500
         throw err;
        }

    }
    else
    {
        let err=new Error("user already exists with given email id")
        err.stack=409;
        throw err;

    }
}

user.login=async(data)=>
{
    console.log("model data",data)
    const conn=await connection.getConnection()
   console.log(data.email)
  const emailVerify=await conn.find({"email":data.email})

    if(emailVerify.length>0)
    {
        if(data.password==emailVerify[0].password)
        {
            console.log("success..logged",emailVerify[0].userId)
            return emailVerify[0].userId
        }
        else
        {
            let err=new Error("Password mismatch of userId "+emailVerify[0].userId )
            err.stack=500
            throw err;
        }
        
    }


    else
    {
        let err=new Error("User does not  exist with email "+data.email)
        err.stack=500
        throw err;
    }
   
}
user.getspecificproduct=async(categ)=>
{
    console.log("model",categ)
    const prodconn=await connection.getProductConnection()
    let find=await prodconn.find({"pCategory":categ})
    if(find.length>1)
    {
        return find;
    }
    else
    {
        return null;
    }

}

user.addItem=async(email,prod)=>
{
    


    console.log("model",prod)
    const userColl=await connection.getConnection()
    const cartColl=await connection.getCartConnection()
    let p=await cartColl.findOne({"email":email})
    console.log("yes",p)
    if(p)
    {
        var upd=await cartColl.updateOne({"uCart.pid":prod.pid,"email":email},{$inc:{"uCart.$.pquantity":1}})
        if(upd.nModified==0)
        {
            console.log("need to modify")
           await cartColl.updateOne({"email":email},{$push:{"uCart":{"pid":prod.pid,"pquantity":1}}})
           console.log("cart added with pid"+prod.pid)
           return {message:"cart added with pid"+prod.pid}
        }
        else{
            return {message:`quant with prod id ${prod.pid} increased by 1`}
        }
    }
    else
    {
        console.log("in else")
        let obj =  {
            email: email,
          
            uCart: [{pid:prod.pid,pquantity:1}]
            
          };

        // obj.save()
cartColl.create(obj)
        return {message:`Cart with email ${email} created successfully and item with id ${prod.pid} added sucessfully`}
    }
}



user.updateProductQuantity=async(id,email,quantity)=>
{
    const prodModel=await connection.getProductConnection()
    const cartModel=await connection.getCartConnection()
    var upd=await cartModel.updateOne({"email":email,'uCart.pid':id},{'$set':{'uCart.$.pquantity':quantity}}) //imp $
    // if(upd)
    // {
    //     var upd2=await prodModel.updateOne({"pid":id},{$inc:{'pQuantityAvailable':-quantity}})
    //     console.log("upd2",upd2)
    // }
    
    console.log("quanit upd",upd)

}


user.getAllProducts=async(email)=>
{
    console.log("model getall")
    const cart=await connection.getCartConnection()
    let user=await cart.findOne({"email":email})
    user=user.toObject()
    const prodIds = user.uCart.map((p)=>{return p.pid})

    const prod=await connection.getProductConnection()
    let prodData=await prod.find({"pid":{$in:prodIds}})
    result=prodData.map((p)=>{return p.toObject()})


    const products=result.map((p)=>{
        user.uCart.forEach((el)=>
        {
            if(p.pid==el.pid)
            {
                p["userCustomQuantity"]=el.pquantity
                console.log("heyyy",p)
            }
        })
        return p;
    })
    if(products.length<1)
    {
        return []
    }
    else
    {
        return products
    }
}




user.removeProd=async(email,id)=>
{
    console.log("model rem")
    const prodModel=await connection.getProductConnection()
    const cartModel=await connection.getCartConnection()
   const rem= await cartModel.updateOne({"email":email},{'$pull':{'uCart':{'pid':id}}})
   if(rem)
   {
       return true
   }
//    if(rem)
//     {
//         var upd2=await prodModel.updateOne({"pid":id},{$inc:{'pQuantityAvailable':quantity}})
//         console.log("upd2",upd2)
//     }
   else
   {
       return false;
   }
}

async function generateOrderId()
{
    console.log("hoiiiiiiiiiiiiiiiii")
    const model=await connection.getOrderConnection()
    const result=await model.distinct("uOrders.orderId")
    if(result.length==0)
    {
        return "O1001"
    }

    console.log(model)
    console.log(result)
    let value=result.map(p=>
        {
            return p.substr(1)

        })
    console.log(value)
    let max=Math.max(...value)
    console.log(max)
    return "O"+(parseInt(max)+1)
}

user.dummy=()=>
{
    return "heelo"
}
user.updateOrder=async(prod,email)=>
{
    
    console.log("model ord",prod)
    let sum=5
    console.log("model order")
    for(let i in prod)
    {
       console.log("in loop")
       console.log(prod[i].price)
       console.log(prod[i].userCustomQuantity)
        sum+=((prod[i].price-((prod[i].price)*(prod[i].pDiscount)))*prod[i].userCustomQuantity)
        console.log("here")
        console.log("in loop",sum)
       
    } 
   
    let s = Math.round(sum+150) 
   
    const prodModel=await connection.getProductConnection()
    
    const orderModel=await connection.getOrderConnection()
    const cartModel=await connection.getCartConnection()
   
    let user=await cartModel.findOne({'email':email})
   
    let cartItems=user.uCart
   
    if(user)
    {
        console.log("user")
        let isValid=true
        const prods=prod.map((p)=>
        {
            user.uCart.forEach((cartProd)=>
            {
                if(p.pid==cartProd.pid){
                if(p.pquantity<cartProd.pquantity)
                {
                    console.log("false")
                    isValid=false
                    let err=new Error("quantity out of stock")
                    err.status=401
                    throw err
                }
            }
            })
        })


        if(isValid==true)
        {
            console.log("valid")
            
         
            let o=await generateOrderId()
            console.log("o",o)
            let obj =  {
                email: email,
              
                uOrders: [{orderId:o,cartTotal:s,orderProd:cartItems}]
                
                
              };
            let order={
                orderId:o,
               
                cartTotal:s,
                orderProd:cartItems
            }
            let result= await orderModel.updateOne({'email':email},{$push:{uOrders:order}})
            if(result.nModified==0)
            {
                console.log("next")
                 orderModel.create(obj)
            }
          
            for(let j of cartItems)
            {
                let p=await prodModel.updateOne({'pid':prod.pid},{$inc:{'pquantity':-prod.pquantity}})

            }
            let res=await cartModel.updateOne({'email':email},{$unset:{uCart:[]}})
            console.log("unset")
            return isValid
        }
    }
}

user.getOrders=async(email)=>
{
    console.log("model get order")
    const orderColl=await connection.getOrderConnection()
    const data=await orderColl.find({'email':email})
    if(data)
    {
        console.log("orders model",data)
        return data
    }
}


user.searchProd=async(item)=>
{
    let mod=await connection.getProductConnection()
    let data=await mod.find({"pName":{"$regex":`${item}`,$options:"i"}});
    if(data.length<1)
    {
        return null;
    }
    else
    {
        return data;
    }
}




module.exports=user