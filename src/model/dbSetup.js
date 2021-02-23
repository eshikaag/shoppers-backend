const connection = require("../utilities/connection");

const userDetails = {
    "userId": "U1001",
    "userName": "John",
    "password": "John1@",
    "contact": 9999999999,
    "address": "United States",
    "email": "john@gmail.com",
    "dob": "1998-04-20",
    "gender": "Male"
}

let setup = {}

setup.data = async () => {
    try{
    let userModel = await connection.getConnection();
    await userModel.deleteMany();
    console.log("Line 20");
    const insertData = await userModel.insertMany(userDetails);
    console.log(insertData);
    if(insertData.length > 0)
        return "Added " + insertData.length + " records";
    else
        return null;
    }
    catch(err){
        console.log(err);
        let er = new Error("Failed to connect");
        er.status = 500;
        throw er;
    }
   
}

module.exports = setup;