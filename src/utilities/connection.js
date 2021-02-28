const mongoose = require('mongoose');
const {Schema} = require('mongoose');
mongoose.Promise = global.Promise;

const url = "mongodb://localhost:27017/shoppersDB";

const userSchema =Schema({

    userId: {type:String, required:true},
    userName: {type:String, required: true},
    password: {type:String, required:true},
    contact: {type:Number, required:true},
    address: {type:String, required:true},
    email: {type:String, required:true},
    dob: {type:Date, required: true},
    gender: {type:String},

    // uCart:{
    //     email/.........
    //     pid:{type:String, required:true},
    //     pquantity:{type:Number,required:true}
    // }

});



const productSchema=Schema({
    pid:{type:String, required:true},
    pName: {type:String, required:true},
    pDescrip: {type:String, required:true},
    pRating:  {type:Number, required:true},
    pCategory:{type:String, required:true},
    img: {type:String, required:true},

    color: {type:String, required:true},
    price:  {type:Number, required:true},
    pDiscount:  {type:Number, required:true},
    pQuantityAvailable:  {type:Number, required:true},
    pShippingCharges:  {type:Number, required:true}
   

})

const cartSchema=Schema({
  
   email:{type:String, required:true},
   uCart:{type:[ {pid:{type:String, required:true}, pquantity:{type:Number, required:true}} ]}
 
   

})

let connection = {};


connection.getConnection = ()=> {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(data => {console.log("IN HERE");return data.model("users", userSchema)}).catch(err => {
        let errr = new Error("Failed to connct to database");
        errr.status = 500;
        throw errr;
    })
}
connection.getProductConnection = ()=> {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(data => {console.log("IN prod HERE");return data.model("products", productSchema)}).catch(err => {
        let errr = new Error("Failed to connct to database");
        errr.status = 500;
        throw errr;
    })
}

connection.getCartConnection = ()=> {
    return mongoose.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(data => {console.log("IN cartHERE");return data.model("cart", cartSchema)}).catch(err => {
        let errr = new Error("Failed to connct to database");
        errr.status = 500;
        throw errr;
    })
}
// let x=mongoose.model('cart', cartSchema)
module.exports=connection;


 