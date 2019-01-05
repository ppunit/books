const express = require("express");
const app = express();
const joi=require('joi')
const mongoose = require('mongoose')
const bodyparser = require("body-parser"); //to use json file we need bodyparser
var db = mongoose.connection;

// required databse
require("./bookdatabase");
//required schema's
const schema  = require("./api/modules/schema")
const user  = require("./api/modules/userschema")

//middleware
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json()) //we are using a middleware for json file to  be used here

//getting books api
app.get('/books', (req, res) => {
      schema.find().then(eachOne => {
        res.json(eachOne);
      }).catch((err) => {
        res.status(404).send("no books are there ");//status 400 mean that the endpoint is valid but the resource itself does not exis
      });
    });
  
    //book id to be searched api
    app.get('/books/:id', (req, res) => {
          var bookIdToBeSearch=req.params.id;
          var id=parseInt(bookIdToBeSearch);
          var re=new RegExp('^(\d{13})?$');
          if (re.test(id)) {
            schema.find({isbn:bookIdToBeSearch}).then(eachOne => {
                  if(eachOne.length>=1)
              res.json(eachOne);
              else
              res.status(404).json({message :"book not found"});
            }).catch((err) => {
              res.status(400).json({message :"book not found"});
            });
        } else {
            console.log("Invalid search the search shoul be a 13 digit number");
        }
      
    }); 
    
    
//user signup api validation using joi
app.post("/user/authorize", (req, res) => {
      var name=req.body.username;
      console.log(req.body.username);
      const scheme=joi.object().keys({
             username: joi.string().min(3).max(20).required()
            
      })
      var promise= new Promise((res,rej)=>{
      joi.validate(req.body,scheme,(err,result)=>{
            
                  if(err)
                  {
                        rej(new Error("not valid user"));
                  }
                  console.log(result);
                  //res.send(req.body.username);
                  res(req.body.username);
            })
            
      })
      promise.then(username=>{
            user.find({"name":username})
            .then(result=>{
                  if(result.length>=1)
                  console.log(`${username} is present`);
                  else
                  {
                        console.log("creating new user");
                        var newuser=new user({
                              name:name,
                              wantToRead:[],
                              reading:[],
                              read:[]

                        })
                  newuser.save(function(err,newuser){
                        if(err) return console.log(err)
                        console.log("new user added ");
                  })
                  }
 
            })
            .catch(err=>{
                  console.log('something went wrong');
                  
            })
      }).catch(err=>{
            console.log(err);
      })
      
})

//list/wantToRead
app.get('/list/want-to-read',(req,res)=>{
      var username=req.body.username;
   
   user.findOne({"name":username},{wantToRead:1,_id:0})
   .then((result)=>{
         console.log(result);
       res.send(result);
   })
   .catch(err=>{
         res.status(404).send('no books are there')});
})
app.post('/list/want-to-read',(req,res)=>{
      var username=req.body.username;
      var isbn=req.body.isbn;
      console.log(username,isbn)
     user.updateOne({"name":username}, { $push: { "wantToRead": isbn } }).then(() => {
      res.send(`'${isbn}' is added want-to-read list`);
     }).catch((err) => {
      res.status(400).send(err)
  
  
     })

})
app.delete('/list/want-to-read/:id',(req,res)=>{  
      var username=req.body.username;
      var isbn=req.params.id;
      console.log(username,isbn)
     user.updateOne({"name":username}, { $pull: { "wantToRead": isbn } },{multi:true}).then(() => {
      res.send(`'${isbn}' is deleted from want-to-read list`);
     }).catch((err) => {
      res.status(400).send(err)
  
  
     })
})



//list/reading
app.get('/list/reading/',(req,res)=>{
      var username=req.body.username;
   user.findOne({"name":username},{reading:1,_id:0})
   .then((result)=>{
         console.log(result);
       res.send(result);
   })
   .catch(err=>console.log('no books are there'));

})
app.post('/list/reading',(req,res)=>{

      var username=req.body.username;
      var isbn=req.body.isbn;
      console.log(username,isbn)
     user.updateOne({"name":username}, { $push: { "reading": isbn } }).then(() => {
      res.send(`'${isbn}' is added to reading list`);
     }).catch((err) => {
      res.status(400).send(err)
  
  
     })

})
app.delete('/list/reading/:id',(req,res)=>{

      var username=req.body.username;
      var isbn=req.params.id;
      console.log(username,isbn)
     user.updateOne({"name":username}, { $pull: { "reading": isbn } },{multi:true}).then(() => {
      res.send(`'${isbn}' is deleted from reading list`);
     }).catch((err) => {
      res.status(400).send(err)
  
  
     })

})


//list/read
app.get('/list/read/',(req,res)=>{
      var username=req.body.username;
      user.findOne({"name":username},{read:1,_id:0})
      .then((result)=>{
            console.log(result);
          res.send(result);
      })
      .catch(err=>console.log('no books are there'));

})
app.post('/list/read',(req,res)=>{

      var username=req.body.username;
      var isbn=req.body.isbn;
      console.log(username,isbn)
     user.updateOne({"name":username}, { $push: { "read": isbn } }).then(() => {
      res.send(`'${isbn}' is added to read list`);
     }).catch((err) => {
      res.status(400).send(err)
  
  
     })

})
app.delete('/list/read/:id',(req,res)=>{

      var username=req.body.username;
      var isbn=req.params.id;
      console.log(username,isbn)
     user.updateOne({"name":username}, { $pull: { "read": isbn } },{multi:true}).then(() => {
      res.send(`'${isbn}' is deleted from read list`);
     }).catch((err) => {
      res.status(400).send(err)
  
  
     })

})

app.listen(7777, function () {
      console.log("server is running on port 7777")
})