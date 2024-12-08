const { idzod,todozod,delzod }=require("./types.js");
const { montodo }=require("./db.js");
const express=require("express");
const app=express();
const cors=require("cors");
app.use(cors());
app.use(express.json());
app.post("/",async function(req,res){
   const unparsedtodo=req.body;
   const parsedtodo=todozod.safeParse(unparsedtodo);
   if(!parsedtodo.success)
   {
      return res.status(411).json({msg:"wrong inputs"});
   }
    const createdtodo=await montodo.create({
        title:unparsedtodo.title,
        description:unparsedtodo.description,
        completed:false
    })
    res.send(createdtodo);
});
app.put("/update",async function(req,res){
    const {id,status}=req.body;
    const parsedidtoup=idzod.safeParse(req.body);
    if(!parsedidtoup.success)
    {
        return res.status(411).json({msg:"wrong inputs"});
    }
    await montodo.updateOne({_id:req.body.id},{completed:status});
    return res.json({msg:"updated"});
})
app.get("/show",async function(req,res){
   const alltodos=await montodo.find({});
    res.json({alltodos:alltodos});
})
app.delete("/delete",async function(req,res){
    const id= req.body;
    const parsedid=delzod.safeParse(id);
    if(!parsedid.success)
    return res.status(411).json({msg:"INVALID INPUT"});
    await montodo.findByIdAndDelete(req.body.id);
    return res.status(200).json({msg:"deletedTodo"});  
})
app.listen(5000,function(){
    console.log("app is listening at the port 5000");
})