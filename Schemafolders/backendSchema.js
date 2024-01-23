const mongoose=require("mongoose");
const backenddataSchema=new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    catdivd:{
        type:String,
        required:true
    },
    course_name:{
        type:String,
        required:true
    },
    img:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    cat1:{
        type:String,
        required:true
    },
    participants:{
        type:Number,
        required:true
    },
    cat2:{
        type:String,
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    cat3:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },

})
const str=mongoose.model('backenddata', backenddataSchema);
module.exports={str}