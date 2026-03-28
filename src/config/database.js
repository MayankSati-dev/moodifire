const mongoose=require("mongoose");

async function connectodb(){
await mongoose.connect(process.env.DATABASE)
        console.log("connected to db")
}

module.exports=connectodb