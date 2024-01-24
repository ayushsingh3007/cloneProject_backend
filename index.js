const express=require('express')
const app=express()
const cors=require('cors')
const port=4200
const bodyparser=require('body-parser')
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