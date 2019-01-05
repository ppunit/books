const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{
        required:true,
        unique:true,
        type:String},
    
    wantToRead:[{type:String,unique:true,required:true}],
    reading:[{type:String,unique:true,required:true}],
    read:[{type:String,unique:true,required:true}]

}, { collection : 'userdata' })

module.exports=mongoose.model("user",userSchema)