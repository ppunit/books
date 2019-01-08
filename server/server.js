const express = require("express");
// const app = express();
const joi = require('joi')
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
//required schema's
const schema = require("./api/schema/bookschema")
const user = require("./api/schema/userschema")

//middleware

app.use(bodyparser.json()) //we are using a middleware for json file to  be used here
//creating a middleware for existing user login

app.use("/api/login", (req, res) => {
      var name = req.headers.username;
      //console.log(req.headers.username);
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
                        res.send(`${name} is present`);

                  } else {
                        res.send("There is no user with this name");
                  }
            }).catch(err => {
                  res.send('something went wrong');
            })

})
app.use('/books', books);
app.use('/user-register', userRegister);
app.use('/userbooks', userapi);