
const jwt=require('jsonwebtoken')
const express=require('express')

const { backendSchema } = require('../schema/backendSchema')
const { registerSchema } = require('../schema/userSchema')
const auther = require('../authentic/authentic')
const bcrypt=require('bcryptjs')
const Prepcourses = require('./data')
const cors=require('cors')
const { coursetype } = require('../schema/courseSchema')


const app1=express.Router()
app1.use(cors())

const stripe=require('stripe')("sk_test_51OK7daSAg3lXy8qLZhheRgo3J3APhi6R52IAFx3uP0NwcRhA5MXL1WkNx9p73iwoMSHmNRsEJ6LyVwnhkcrQYGIB00X6Jf63tM")
const saltround=10
const secretkey="cloneProject"

let course1=""
let storeItem=""

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
        const token= jwt.sign({user:user.email},secretkey,{expiresIn:'365d'})
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
                    const token = jwt.sign({ useremail: logindetails.email }, secretkey, { expiresIn: "365d" });
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




app1.get("/auth",async (req, res) => {
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


app1.get("/mobdata",async (req,res)=>{
    
   
    const dbres4=await dumy.find({})
    console.log(dbres4)
    
    return res.send(dbres4)
})


const htmlsuccesspage = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #f0f0f0;
        }
        h1 {
            color: blue;
            margin-left:20%;
            margin-bottom:30px;
            
        }
        .cont{
            display:flex;
            align-items:center;
            flex-direction:column;
            border:2px;
            
        }
       button{
            
            margin:45%;
            margin-top:30px;
       }
    </style>
    <title>payment</title>
</head>
<body>
<div className="cont">
<div>
    <h1>Payment successfull and course confirmed</h1>
    <div>
    
     <button className=" bot1"><NavLink to="/">continue with your course</NavLink></button>
    </div>
    </div>
    </body>
</html>
`;



app1.post("/createcheckout1", async (req, res) => {
    console.log("hiiiii")
  const  {products}  = await req.body;
//   const num=parseInt(products)
//   const specificdata=arr.filter((item)=>{item.id==num})
  console.log(products,"-------------------------------");
  console.log(typeof(products))

//   course1={useremail:mailid,
//             bookname:specificdata.bookname,
//             price:specificdata.price
//         }
//     const ressee=coursestr.create(course1)
//     console.log(ressee)
    //const dbres1=await reg.create(user)
     storeItem=products.map((prod1)=>({
            useremail:prod1.useremail,
            id:prod1.id,
            catdivd:prod1.catdivd,
            nameofthecourse:prod1.nameofthecourse,
            imgsrc:prod1.imgsrc,
            date:prod1.date,
            cat1:prod1.cat1,
            participants:prod1.participants,
            cat2:prod1.cat2,
            duration:prod1.duration,
            cat3:prod1.cat3,
            price:prod1.price

}))
    


const lineItems = products.map((prod) => ({
    price_data: {
        currency: "inr",
        product_data: {
            name: prod.nameofthecourse,
        },
        unit_amount: prod.price,
    },
    quantity: 1,
}));
    
    

  try {
    
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: "payment",
      
      success_url: "https://clone-project-frontend.vercel.app/dashboard",
      cancel_url: "https://clone-project-frontend.vercel.app/",
    });

    res.json({ id: session.id });
    const ressee=coursetype.create(storeItem[0])
    console.log(ressee)
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app1.get("/Success",(req,res)=>{
    
    return res.send(htmlsuccesspage)
   
})
app1.get("/Cancel",(req,res)=>{
    return res.send({msg:"cancel"})
})

app1.get("/bought",async (req,res)=>{
    const buyingcourses=await coursetype.find({useremail:{$eq:course1}})
    console.log(buyingcourses)
    
    return res.send(buyingcourses)
})




module.exports={app1}