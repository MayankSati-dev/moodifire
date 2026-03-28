// const express=require('express')
// const app=express();

// const cors=require("cors")
// app.use(cors({
//     origin:true,
//     credentials:true
// }))
// const path = require("path");
// app.use(express.json());
// const cookieparser=require("cookie-parser");
// app.use(cookieparser())
// app.use(express.static(path.join(__dirname, "../public")));
// app.use(express.static(publicPath));
// app.use((req, res) => {
//   res.sendFile(path.join(publicPath, "index.html"));
// });

// const authroutes=require("./routes/authroutes")
// const songroute=require("./routes/song.routes")


// app.use('/api',authroutes)
// app.use('/api/song',songroute)
// module.exports=app

const express = require('express');
const app = express();

const cors = require("cors");
const path = require("path");
const cookieparser = require("cookie-parser");

// ✅ middleware
app.use(cors({
  origin: true,
  credentials: true
}));
app.use(express.json());
app.use(cookieparser());

// ✅ public path (IMPORTANT)
const publicPath = path.join(__dirname, "../public");

// ✅ API routes FIRST
const authroutes = require("./routes/authroutes");
const songroute = require("./routes/song.routes");

app.use('/api', authroutes);
app.use('/api/song', songroute);

// ✅ static serve (HTML + CSS + JS)
app.use(express.static(publicPath));

// ✅ React fallback (VERY IMPORTANT - LAST)
app.use((req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

module.exports = app;