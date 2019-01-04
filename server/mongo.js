const mongoose=require("mongoose");
//mongoose.Promise=global.Promise;//ES6 promise globally
mongoose.connect('mongodb://localhost:27017/bookdatabase',{ useNewUrlParser: true }).then(() => {
   console.log('Sucessfully connected');
 });
 
module.exports={mongoose};