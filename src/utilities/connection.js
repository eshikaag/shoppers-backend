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
    gender: {type:String}
});

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

module.exports = connection;


 