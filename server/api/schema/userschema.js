const mongoose=require('mongoose');
const userSchema=mongoose.Schema({
    name:{
        required:true,
        unique:true,
        type:String,
    index:true},
    
    wantToRead:[{type:String,index:true,required:true}],
    reading:[{type:String,index:true,required:true}],
    read:[{type:String,index:true,required:true}]

}, { collection : 'userdata' })

module.exports=mongoose.model("user",userSchema)