import express from 'express';


const app= express();
app.use(express.json())



const port= 8080;

let posts=[
    {id:1, title:"ankit shukla"},
    {id:2, title:"hellow world"}
]
app.get('/',(req,res)=>{
    res.send("welcome")
})

app.get('/posts',(req,res)=>{
    try {
        res.json(posts);
    } catch (error) {
        console.log(error)
        
    }
})

app.post("/posts",(req,res)=>{
    const newPost={
        id:posts.length+1,
        title:req.body.title
    };
    posts.push(newPost)
    res.json({message:"new post is the added", newPost})
})


app.put("/posts/:id",(req,res)=>{
    const post= posts.find(
        p=>p.id===parseInt(req.params.id)
    );
    if(!post) {
        return req.json({message:"not found"})
    }

    post.title= req.body.title;
    res.json({message:"post is the updated"})
})

app.delete("/posts/:id",(req,res)=>{
    posts= posts.filter(p=>p.id!==parseInt(req.params.id));
      res.json({message:'deleted'})
})

app.listen(port,()=>{
    console.log('server is the running on the port 8080')
})