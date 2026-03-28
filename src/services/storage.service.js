const imagekit=require("@imagekit/nodejs").default
const client=new imagekit({
   privateKey:process.env.PRIVATE_KEY
})
async function uploadfile({buffer,filename,folder=""}) {
    const file=await client.files.upload({
        file:await imagekit.toFile(Buffer.from(buffer)),
        fileName:filename,
        folder
    })
    return file
}
module.exports={uploadfile}