const mongoose=require("mongoose")
mongoose.set("strictQuery",true);
const mongocloudUrl="mongodb+srv://ayushsingh3007:mrayush123@cluster0.xxglaeu.mongodb.net/?retryWrites=true&w=majority";
const Connection=async ()=>{
    try{
        await mongoose.connect(mongocloudUrl);
        console.log("Connected Successfully")
    }
catch(err){
    console.log("something wrong in cnnection process:",err)
}
}
module.exports={Connection}
