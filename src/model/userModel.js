const connection = require('../utilities/connection')
let user={}

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


module.exports=user