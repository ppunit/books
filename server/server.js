const express = require("express");
const app = express();
var router      =   express.Router();
const mongoose = require('mongoose')
const bodyparser = require("body-parser"); //to use json file we need bodyparser
var db = mongoose.connection;

//databse
require("./mongo");
const schema  = require("./api/modules/schema")

//middleware
app.use(bodyparser.json()) //we are using a middleware for json fileto  be used here


app.get('/books', (req, res) => {
      schema.find().then(eachOne => {
        res.json(eachOne);
      }).catch((err) => {
        res.status(400).send(err);
      });
    });
    
    
//POST DATA API
app.post("/post", (req, res) => {
      res.send(req.body); //it will show the req body that is sent by client
})

app.listen(7777, function () {
      console.log("server is running on port 7777")
})