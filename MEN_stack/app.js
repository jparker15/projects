require("dotenv").config();

const express = require("express"),
    morgan = require("morgan"),
    mongoose = require("mongoose"),
    app = express(),
    connectURI = process.env.MONGO,
    port = process.env.PORT || 3500;
    const newObj = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    };
const homeRouter = require("./routes/homeRouter");

    app.use(express.json());
    
    app.use(morgan("dev"));

    app.use("/",homeRouter);
    
    mongoose.connect(connectURI,newObj,()=>{
        console.log("app connected to mongoDB");
    });

    mongoose.connection.on("error", (err) => {
        console.error(`error occured connecting to mongoDB,\nerror:\n${err}`);
    });

    mongoose.connection.on("connected", ()=>{
        console.log(`serving attempting connection to mongoDB..`);
    });

    app.listen(port, ()=>{
        console.log(`listening port: ${port}`);
    });



