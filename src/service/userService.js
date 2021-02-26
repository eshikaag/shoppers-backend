const dbsetup=require('../model/dbSetup')
const userModel=require('../model/userModel')

let user={}
user.register=async(data)=>
{
    console.log("reg",data)
    const res=await userModel.register(data)
    console.log("serv res",res)
    return res;
}


user.login=async(data)=>
{
    console.log("login serv",data)
    const res=await userModel.login(data)
    return res;
}


user.getspecificproducts=async(categ)=>
{
    console.log("service",categ)
    const res=await userModel.getspecificproduct(categ)
    return res;
}
module.exports=user