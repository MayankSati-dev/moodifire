const mongoose=require("mongoose");


const blacklisSchema=new mongoose.Schema({
     token:{
        type:String,
        reqired:true,
        unique:true
     }
},{timestamps:true})

const blacklistmodel=mongoose.model("tokenblacklisting",blacklisSchema)

module.exports=blacklistmodel