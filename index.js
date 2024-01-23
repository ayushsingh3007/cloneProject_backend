const express=require('express')
const app=express()
const cors=require('cors')
const port=4200
const bodyparser=require('body-parser')
app
app.use(cors({
    origin:'*'
}))

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());
app.get('/', (req,res)=>{
    return res.send('homepage')
})

app.listen(port,()=>{
    console.log('server running fine')
})