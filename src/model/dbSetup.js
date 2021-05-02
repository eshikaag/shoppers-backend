const connection = require("../utilities/connection");

const userDetails = {
    "userId": "U1001",
    "userName": "John",
    "password": "John1@",
    "contact": 9999999999,
    "address": "United States",
    "email": "john@gmail.com",
    "dob": "1998-04-20",
    "gender": "Male",
   
}

// const cartData={
//     "email": "john@gmail.com",
   
//     }
//     const orderData={
//         "email": "john@gmail.com",
    //    []
//         }
const prodData = [{
    "pid": "p1001",
    "pName": "Lahenga",
    "pDescrip": "lahenga with white color ",
    "pRating": 4,
    "pCategory": "Clothes",
    "img": "clothes1.jpg",
    "color": "white",
    "price": 20000,
    "pDiscount": 0.2,
    "pQuantityAvailable": 8,
    "pShippingCharges": 150
},
{
    "pid": "p1002",
    "pName": "lahenga",
    "pDescrip": "balck lahenga with golden dots",
    "pRating": 4,
    "pCategory": "Clothes",
    "img": "clothes2.jpg",
    "color": "black",
    "price": 9000,
    "pDiscount": 0.2,
    "pQuantityAvailable": 8,
    "pShippingCharges": 150
},
{
    "pid": "p1003",
    "pName": "lahenga",
    "pDescrip": "green lahenga ",
    "pRating": 4,
    "pCategory": "Clothes",
    "img": "clothes3.jpg",
    "color": "green",
    "price": 8000,
    "pDiscount": 0.3,
    "pQuantityAvailable": 8,
    "pShippingCharges": 150
},

{
    "pid": "p1004",
    "pName": "shirt",
    "pDescrip": "black shirt ",
    "pRating": 4,
    "pCategory": "Clothes",
    "img": "clothes4.jpg",
    "color": "black",
    "price": 4000,
    "pDiscount": 0.2,
    "pQuantityAvailable": 98,
    "pShippingCharges": 150
},
{
    "pid": "p1005",
    "pName": "shirt",
    "pDescrip": "blue denim shirt ",
    "pRating": 4,
    "pCategory": "Clothes",
    "img": "clothes5.jpg",
    "color": "blue",
    "price": 7000,
    "pDiscount": 0.2,
    "pQuantityAvailable": 98,
    "pShippingCharges": 150
},
{
    "pid": "p1006",
    "pName": "shirt",
    "pDescrip": "checks",
    "pRating": 4,
    "pCategory": "Clothes",
    "img": "clothes6.jpg",
    "color": "blue",
    "price": 2000,
    "pDiscount": 0.2,
    "pQuantityAvailable": 98,
    "pShippingCharges": 150
},
{
    "pid": "p1007",
    "pName": "shoes",
    "pDescrip": "black and white shoes",
    "pRating": 4,
    "pCategory": "Shoes",
    "img": "shoes1.jpg",
    "color": "black",
    "price": 7000,
    "pDiscount": 0.2,
    "pQuantityAvailable": 98,
    "pShippingCharges": 150
},
{
    "pid": "p1008",
    "pName": "adidas shoes",
    "pDescrip": "adidas",
    "pRating": 4,
    "pCategory": "Shoes",
    "img": "shoes2.jpg",
    "color": "green",
    "price": 10000,
    "pDiscount": 0.2,
    "pQuantityAvailable": 98,
    "pShippingCharges": 150
},
{
    "pid": "p1009",
    "pName": "Leather shoes",
    "pDescrip": "leather shoes",
    "pRating": 4,
    "pCategory": "Shoes",
    "img": "shoes3.jpg",
    "color": "brown",
    "price": 7000,
    "pDiscount": 0.2,
    "pQuantityAvailable": 98,
    "pShippingCharges": 150
},
{
    "pid": "p1010",
    "pName": "Sport shoes",
    "pDescrip": "black and white ",
    "pRating": 4,
    "pCategory": "Shoes",
    "img": "shoes1.jpg",
    "color": "black and white ",
    "price": 7000,
    "pDiscount": 0.2,
    "pQuantityAvailable": 98,
    "pShippingCharges": 150
},
{
    "pid": "p1011",
    "pName": "sofa",
    "pDescrip": "new piece",
    "pRating": 4,
    "pCategory": "Furniture",
    "img": "furniture1.jpg",

    "color": "green",
    "price": 20000,
    "pDiscount": 0.2,
    "pQuantityAvailable": 98,
    "pShippingCharges": 150
},
{
    "pid": "p1012",
    "pName": "Almirah",
    "pDescrip": "Full room covered ",
    "pRating": 4,
    "pCategory": "Furniture",
    "img": "furniture2.jpg",
    "color": "brown",
    "price": 30000,
    "pDiscount": 0.2,
    "pQuantityAvailable": 98,
    "pShippingCharges": 150
    
},
{
    "pid": "p1013",
    "pName": "table",
    "pDescrip": "wooden work ",
    "pRating": 4,
    "pCategory": "Furniture",
    "img": "furniture3.jpg",
    "color": "brown",
    "price": 7000,
    "pDiscount": 0.2,
    "pQuantityAvailable": 98,
    "pShippingCharges": 150
}
]






let setup = {}

setup.data = async () => {
    try {
        let userModel = await connection.getConnection();
        await userModel.deleteMany();
        console.log("Line 20");
        const insertData = await userModel.insertMany(userDetails);
        console.log(insertData);

        
        const prodColl=await connection.getProductConnection()
        await prodColl.deleteMany()
        const resultProd=await prodColl.insertMany(prodData)
   
        const cartColl=await connection.getCartConnection()
        await cartColl.deleteMany()
        // const resultCart=await cartColl.insertMany(cartData)


        const orderColl=await connection.getOrderConnection()
        await orderColl.deleteMany()
        // const resultOrder=await orderColl.insertMany(orderData)


        if (insertData.length > 0 && resultProd.length>0)
            return "Added " + insertData.length + " records";
        else
            return null;
    }
    catch (err) {
        console.log(err);
        let er = new Error("Failed to connect");
        er.status = 500;
        throw er;
    }

}

module.exports = setup;