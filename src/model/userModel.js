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
            console.log(data.userId)
            console.log(data.userDetails.userName)

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

module.exports=user