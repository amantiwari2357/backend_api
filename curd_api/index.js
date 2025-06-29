import express from "express"
import dotenv from "dotenv"
const app= express();
dotenv.config()
app.use(express.json());


const port = process.env.PORT || 4000;


let lists=[
    {id:1, name:"ankit shukla"},
    {id:2, name:"amit shukla"}
]

app.get("/",(req,res)=>{
    res.send("welcome");
})

app.get('/list',(req,res)=>{
    try {
        res.json({message:"total list of data is",lists})
        
    } catch (error) {

        res.json({message:error.message})
        
    }

})

app.post('/list',(req,res)=>{

   try {
     const newList={
        id:lists.length+1,
        name:req.body.name
    }
    lists.push(newList)
    res.json({message:"new name is added in the list", newList} )
   } catch (error) {
    
    res.json({message:error.message})
   }

})

app.delete("/list/:id",(req,res)=>{
    try {
        lists= lists.filter(item=>item.id!==parseInt(req.params.id))
    res.json({message:"item is deleted",lists}) 
    } catch (error) {
        res.json({message:message.error})
    }
})

app.put('/list/:id',(req,res)=>{
    try {

        let list= lists.find(item => item.id === parseInt(req.params.id))
        if(!list){
            res.json({message:"name is not founded"})
        }

        list.name= req.body.name
        res.json({message:"name is the upadated", list})
        
        
    } catch (error) {
        res.json({message:message.error})
    }
})

app.listen(port, ()=>{
    console.log(`your server is the running on the port http://localhost:${port}`);
})