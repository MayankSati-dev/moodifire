const {Router}=require("express");
const songctrl=require("../controller/song.controller")
const upload=require("../middleware/upload.middleware")
const songroute=Router();

songroute.post("/",upload.single("song"),songctrl.uploadsong)
songroute.get("/getmoodisong",songctrl.getsong)
module.exports=songroute