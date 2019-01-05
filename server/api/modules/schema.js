const mongoose=require('mongoose');
const books =mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  isbn: { type: String ,unique:true,required:true},
  title: { type: String },
  subtitle: { type: String },
  author: { type: String },
  published: { type: Date },
  publisher: { type: String },
  pages: { type: Number },
  description: { type: String },
  website: { type: String },

}, { collection : 'book' });

 module.exports=mongoose.model("schema",books)


