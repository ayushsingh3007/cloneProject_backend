const express=require('express')
const app=express()
const cors=require('cors')
const port=4200
const bodyparser=require('body-parser')
const stripe=require("stripe")("sk_test_51OK7daSAg3lXy8qLZhheRgo3J3APhi6R52IAFx3uP0NwcRhA5MXL1WkNx9p73iwoMSHmNRsEJ6LyVwnhkcrQYGIB00X6Jf63tM")

const { Connection } = require('./dbConnection/dbConnection')
const { app1 } = require('./controller/userController')
app
app.use(cors({
    origin:'*'
}))

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.get('/', (req,res)=>{
    return res.send('homepage')
})
app.use(app1)

app.listen(port, async ()=>{
    try{
        await Connection();
        console.log("server is running with",port)
    }
    catch(error){
        console.log(error)
    }

})