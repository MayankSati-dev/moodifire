const expresss=require("express");
const authroutes=expresss.Router();
const auth=require("../controller/auth.controller")
const identifier=require("../middleware/auth.middleware")



authroutes.post("/register",auth.registercontroller)
authroutes.post("/login",auth.logincontroller)
authroutes.post("/logout",auth.logoutuser)
authroutes.get("/get-me",identifier,auth.getmecontroller)


module.exports=authroutes