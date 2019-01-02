const mongoose=require('mongoose');
const post_schema=mongoose.Schema({
    isbn:String,
    title:String,
    subtitle:String,
    author:String,
    published:String,
    publisher:String,
    pages:Number,
    description:String,
    website:String,

})
module.exports=mongoose.model("post",post_schema)