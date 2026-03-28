const authmodel=require("../models/auth.model")
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const blacklistmodel=require("../models/blacklist.model")
const redis=require("../config/cache")

async function registercontroller(req,res){
        const {username,email,password}=req.body;
   const alreadyexist=await authmodel.findOne({
   $or: [{ email }, { username }]
   })
   if(alreadyexist){
    return res.status(409).json({
        message:`user already exist with this ${username} or ${email}`
    })
   }
 const hash=await bcrypt.hash(password,10);

 const user=await authmodel.create({
    username:username,
    email:email,
    password:hash
 })
 
  const token = jwt.sign(
    {
      id: user._id,
      username:user.username
    },
    process.env.WEB_TOKEN,
    { expiresIn: "1d" },
  );

res.cookie("jwt_token", token);

res.status(201).json({
    message:'user register sucessfully',
    user:{
        name:user.username,
        email:user.email,
        password:user.password
    },
    token:token
 })
}

async function logincontroller(req,res){
  
        const {username,email,password}=req.body;
console.log(email,password)
    const checkuser=await authmodel.findOne({
        $or: [{ email }, { username }]
    }).select("+password")
    if(!checkuser){
        return res.status(404).json({
            message:'user not found'
        })
    }

    const checkpass=await bcrypt.compare(password,checkuser.password);
    if(!checkpass){
        return res.status(401).json({
            message:'password invalid'
        })
    }
    const token=jwt.sign({
        id:checkuser._id,
        username:checkuser.username
    },
    process.env.WEB_TOKEN,
    {expiresIn:'1d'},)
   
res.cookie("jwt_token",token);

   res.status(201).json({
    message:'user login sucessfully',
    user:{
        name:checkuser.username,
        email:checkuser.email
    }
    ,token:token
   })
    
    
 
}


async function getmecontroller(req,res){
    const user=await authmodel.findById(req.user.id);
    res.status(201).json({
        messege:'user fetched sucessfully',
        user
    })
}
async function logoutuser(req,res){
   const token =req.cookies.jwt_token;
   res.clearCookie("jwt_token");

   await redis.set(token,Date.now().toString())
  res.status(201).json({
    messege:'logout sucessfully'
  })
}
module.exports={
    registercontroller,
    logincontroller,
    getmecontroller,
    logoutuser
}