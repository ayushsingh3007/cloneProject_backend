
const jwt=require('jsonwebtoken')
const express=require('express')

const { backendSchema } = require('../schema/backendSchema')
const { registerSchema } = require('../schema/userSchema')
const auther = require('../authentic/authentic')
const bcrypt=require('bcrypt')
const Prepcourses = require('./data')
const app1=express.Router()


app1.use(cors())
// const stripe=require("stripe")("sk_test_51OK7daSAg3lXy8qLZhheRgo3J3APhi6R52IAFx3uP0NwcRhA5MXL1WkNx9p73iwoMSHmNRsEJ6LyVwnhkcrQYGIB00X6Jf63tM")
const saltround=10
const secretkey="cloneProject"

// const course1=""
// const storeItem=""

app1.get("/courses",async (req,res)=>{
    for(let i=0;i<Prepcourses.length;i++){
        let rt=await backendSchema.create(Prepcourses[i])

    }
    return res.send("successfully stored")

})


app1.post("/compltdata",async(req,res)=>{
    let arr1=await backendSchema.find({})
    return res.send(arr1)
})


app1.post("/books", (req,res)=>{
    return res.send(arr)
})



app1.post("/register",async (req,res)=>{
    const user=req.body;
    try{
    const samemail=await registerSchema.findOne({email:{$eq:user.email}})
    if(samemail){
        console.log({msg:"user already registered"})
        return res.send({msg:"email already registered"})
    }
    else{
        // const gen=bcrypt.genSaltSync(saltround)
        user.password=bcrypt.hashSync(user.password,saltround)
        console.log(user.password)
        const dbres1=await registerSchema.create(user)
        console.log(dbres1)
        const token= jwt.sign({user:user.email},secretkey,{expiresIn:'300000'})
        console.log(token)
        // arr.push(user)
        
        return res.send({msg:"user successfully registered",token:token})
    }
    
}
catch(error){
    console.log(error)
}
})


app1.post("/login",async (req,res)=>{
    const logindetails= await req.body;

    try{    
        console.log(logindetails)
    
        const validmaildetails= await registerSchema.findOne({email:{$eq:logindetails.email}})
        console.log(validmaildetails,"----------")
        if(validmaildetails){
            // console.log({msg:"email already exists"}) 
            course1=logindetails.email
            console.log(course1)
            
    
            const comparedetails= bcrypt.compareSync(logindetails.password,validmaildetails.password)
        
            console.log(comparedetails)
            if(comparedetails)

                {
                    const token = jwt.sign({ useremail: logindetails.email }, secretkey, { expiresIn: "360000" });
                    console.log("token:", token);
                    return res.send({ msg: "your login successfully", token: token, userdetail: validmaildetails });
        
            // return res.send({msg:"your login successfully"})
                }
            else{
                return res.send({msg:"your password is wrong"})
            }
        }
    
        else{
            return res.send({msg:"first you have to register or check your credentials"})

        }
}
catch(error){
    return res.send({msg:error})
} 
})




app1.get("/auth",auther,async (req, res) => {
    const user = req.user;
    console.log(user);
    if (user && user.useremail) {
        try {
            const userinfo = await registerSchema.findOne({ email: user.useremail });
            if (userinfo) {
                res.send({ msg: "User Authorized", userdata: userinfo })
            }
            else {
                res.status(404).send("User not found");
            }
        }
        catch (err) {
            console.log("Error fetching user detail from db:", err);
        }
    }
   console.log("user authorized")
   
})


module.exports={app1}