const songmodel=require("../models/song.model")
const storageservices=require("../services/storage.service")
const id3=require("node-id3");


async function uploadsong(req,res){
   const detail=req.file.buffer
   const tags=id3.read(detail);
   const mood=req.body.mood

console.log(mood)
//promise.all ka use karne se done function ek saath call honge or data 
//jaldi aayega
const [songfile,posterfile]=await Promise.all([
   storageservices.uploadfile({
   buffer:detail,
   filename:tags.title +"mp3",
   folder:"/moodifire/songs"
   }),

    storageservices.uploadfile({
    buffer:tags.image.imageBuffer,
    filename:tags.title +".jpeg",
    folder:"/moodifire/posters"
   })
])
 


   const song=await songmodel.create({
    title:tags.title,
    url:songfile.url,
    postUrl:posterfile.url,
    mood:mood
   })


   res.status(201).json({
    messege:'song created sucessfully',
    song
   })
}




async function getsong(req, res) {
  try {
    const { mood } = req.query;
    console.log(mood);

    const songs = await songmodel.aggregate([
      { $match: { mood } },
      { $sample: { size: 1 } }
    ]);

    const song = songs[0]; // get first random song

    // ✅ Check if no song found
    if (!song) {
      return res.status(404).json({
        message: "No song found for this mood"
      });
    }

    res.status(200).json({
      song
    });

  } catch (err) {
    res.status(500).json({
      message: "Error fetching song",
      error: err.message
    });
  }
}


module.exports={uploadsong,getsong}