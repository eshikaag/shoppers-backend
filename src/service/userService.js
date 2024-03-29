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

user.addItem=async(email,prod)=>
{
    console.log("serv additem",prod)
    const res=await userModel.addItem(email,prod)
    return res
}


user.getAllProducts=async(email)=>
{
    console.log("serv getall")
    let prod=await userModel.getAllProducts(email)
    if(prod)
    {
        return prod;
    }
    else
    {
        let err=new Error("prod not there")
        err.status=404
        throw err
    }
}





user.updateQuantity=async(id,email,quantity)=>
{
    console.log("serv upd")
    let user=await userModel.updateProductQuantity(id,email,quantity)
    if(user)
    {
        prod=await userModel.getAllProducts(email)
    }
    if(await userModel.getAllProducts(email)==null)
    {
        let err=new Error("prod not avail")
        err.status=404
        throw errr

    }
    else
    {
        return await userModel.getAllProducts(email)
    }
}


user.removeProd=async(email,id)=>
{
    console.log("serv rem")
    let res=await userModel.removeProd(email,id)
    let prod;
    if(res)
    {
        prod=await userModel.getAllProducts(email)
    }
    return prod
}

user.updateOrder=async(email,prod)=>
{
    console.log("serv order")
    let upd=await userModel.updateOrder(email,prod)
    if(upd)
    {
        return upd;
    }
    else
    {
        let err=new Error()
        err.status=404
        throw err;
    }
}

user.getOrders=async(email)=>
{
    console.log("inside  serv",email)
    let data=await userModel.getOrders(email)
    if(data)
    {
        return data
    }
    else
    {
        let err=new Error("cANNOT return orders")
        err.status=404
        throw err
    }
}



user.searchProd=async(item)=>
{
    
    let p=await userModel.searchProd(item);
    console.log("hello");
    if(p==null)
    {
        let err=new Error("cANNOT return orders")
        err.status=404
        throw err
    }
    else
    {
        return p;
    }
}

module.exports=user