import express from 'express'
import dotenv from 'dotenv'

const app= express();

app.use(express.json())
dotenv.config();


const port = process.env.PORT|| 8080;


app.get("/",(req,res)=>{
    res.send("welcome")
})


let details=[
    {id:1,name:"Ankit Shukla", age:22, work:"engineer"},
    {id:2,name:"ritesh Shukla", age:12, work:"manager"},
   {id:3,name:"aman", age:42, work:"hr"}

]



app.get("/list",(req,res)=>{
    try {
        res.json({details})
    } catch (error) {
        res.json({message:error.message})
    }
})


app.post("/add",(req,res)=>{

    try {
    
        const newMember={
            id: details.length+1,
            name:req.body.name,
            age:req.body.age,
            work:req.body.work
        }
        details.push(newMember);
        res.json({message:"new  member are added successfully", newMember})
        
    } catch (error) {
        res.json({message:error.message})
    }
})




app.delete("/delete/:id",(req,res)=>{
    try {
        

        details= details.filter(item=> item.id !== parseInt(req.params.id))

        res.json({message:"this is deleted"})


    } catch (error) {
         res.json({message:error.message})

    }
})

app.put('/update/:id',(req,res)=>{
    try {
        let data= details.find(item=> item.id=== parseInt(req.params.id));

        data.name= req.body.name;
        data.age= req.body.age
        data.work= req.body.work

        res.json({message:"updated", data} )

    } catch (error) {
          res.json({message:error.message})
    }
})
app.listen(port,()=>{
    console.log('server is the running on the port'+ port)
})