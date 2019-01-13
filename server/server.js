const express = require("express");
// const app = express();
const joi = require('joi')
const cors=require('cors');
const mongoose = require('mongoose')
const bodyparser = require("body-parser"); //to use json file we need bodyparser
// var db = mongoose.connection;

// required databse
const db = require("./bookdatabase");
const app = db.app;
//required modules
const books = require("./api/modules/books")
const userRegister = require("./api/modules/auth")
const userapi = require("./api/modules/userbooks")
const fuzzysearch =require("./api/modules/fuzzysearch")
//required schema's
const schema = require("./api/schema/bookschema")
const user = require("./api/schema/userschema")

//middleware
app.use(cors());
app.use(bodyparser.json()) //we are using a middleware for json file to  be used here
//creating a middleware for existing user login

app.post("/api/login", (req, res) => {
      var name = req.headers.username;
      console.log(name);
      const scheme = joi.string().min(3).max(20).required()
      joi.validate(name, scheme, (err, result) => {

            if (err) {
                  res.send(new Error("not valid user"));
            }
            
      })
      user.find({
                  "name": name
            })
            .then(result => {
                  if (result.length >= 1) {
                       
                        //res.send(JSON.stringify("user is present"));
                   res.send("200");
                  } else {
                        res.send("404");
                        //res.send(JSON.stringify("There is no user with this name"));
                  }
            }).catch(err => {
                  console.log(err);
            })

})
app.use('/books', books);
app.use('/user-register', userRegister);
app.use('/userbooks', userapi);
app.use('/booksearch',fuzzysearch);