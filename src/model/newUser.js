class NewUser{
    
   
    constructor(object)
    {
        this.userDetails={
            "userId":'',
            "userName":object.userName,
         
            
            "password":object.password,
            "contact":object.contact,
            "address":object.address,
            "email":object.email,
            "dob":object.dob,
            "gender":object.gender
        }
    }
}
console.log("new user class")
module.exports=NewUser