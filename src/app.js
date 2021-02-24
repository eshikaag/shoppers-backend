const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
// const routerrr=express.Router()
const requestLogger = require("./utilities/requestlogger");
const errorLogger = require("./utilities/errorlogger");
const setup = require("./model/dbSetup");
const router=require('./routes/userRoute')

app.use(cors());
app.use(bodyParser.json());
app.use('/',router)
app.use(requestLogger);

app.get("/setupDb",async (req, res, next) => {
    try{
   let data = await setup.data();
   if(data != null)
        res.send(data);
    else
        res.send("Data not inserted");
    }
    catch(err){
        next(err);
    }
})

app.get("/user", (req, res,next) => {
    res.send("Working");
})


app.use(errorLogger);
app.listen(4000);

