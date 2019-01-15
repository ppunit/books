const express = require("express");
const router = express.Router();
const joi = require('joi')

const user = require("../schema/userschema")

//user authorize api validation using joi
//takes the username as a header information
//then with the joi schema will check the string is correct 
//afterthat joi validate will return  a promise if valid data
//if promise is resolve then will search the username in user database 
//if found its return user is present
//else we have to create a new user in database
router.post("/api/register", (req, res) => {

    var name = req.body.username;
    console.log(req.body.username);
    const scheme = joi.string().min(3).max(20).required()

    joi.validate(name, scheme, (err, result) => {

        if (err) {
            res.send("422");//not a valid user
        }

    })
    user.find({
            "name": name
        })
        .then(result => {
            if (result.length >= 1)
                res.send("409");
            else {
                var newuser = new user({
                    name: name,
                    wantToRead: [],
                    reading: [],
                    read: []
                })
                newuser.save(function (err, newuser) {
                    if (err) return console.log(JSON.stringify("cannot add a user"))
                    res.send('201');
                })
            }

        }).catch(err => {
            res.send("404");//cannot add the user
        })
})


module.exports = router;