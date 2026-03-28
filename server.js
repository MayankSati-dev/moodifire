require("dotenv").config();
const app=require("./src/app");
const connectodb=require("./src/config/database");
connectodb()
const PORT = process.env.PORT || 3000;

app.listen(PORT,()=>{
    console.log("server running on port 3000")
})