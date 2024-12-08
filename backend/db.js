const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/");

const todoschema=mongoose.Schema({
    title:String,
    description:String,
    completed:Boolean
})      
//todo5 is the name of the space in mongodb where all data is stored
// mongotodo is variable to store various functions provided by model class of the mongodb such create, update etc
const montodo=mongoose.model("todo5",todoschema); 

module.exports={
    montodo:montodo
}