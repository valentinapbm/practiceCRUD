const mongoose = require("mongoose");

function connect(){
    mongoose.connect("mongodb://localhost:27017/practice");


    mongoose.connection.once("open", ()=>{
        console.log("Conected with mongo")
    });

    mongoose.connection.on("error", (err)=>{
        console.log("Something went wrong!", err);
    });

    return mongoose.connection;

}
module.exports={connect};