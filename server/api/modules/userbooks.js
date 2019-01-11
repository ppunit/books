const express = require("express");
const router = express.Router();
const books = require("../schema/bookschema")
const user = require("../schema/userschema")
var validStringOrNot = function (isbn) {

    return new Promise((resolve, reject) => {
        var bookIdToBeSearch = isbn;
        var re = new RegExp(/^(\d{13})?$/);
        if (re.test(bookIdToBeSearch))
            resolve(bookIdToBeSearch);
        else
            reject(new Error("Invalid search the search should be a 13 digit number"));
    })
}

// router.use(() => {
//     console.log('userbooks');
//     next();
// })

var validBookOrNot = function (isbn) {
    return new Promise((resolve, reject) => {
        var bookIdToBeSearch = isbn;
        books.find({
                isbn: bookIdToBeSearch
            })
            .then(books => {
                if (books.length >= 1)
                    resolve(books);
                else
                    reject(new Error("book not found"));

            })

    })
}


var getBooks = function (listType, username) {
    return new Promise((resolve, reject) => {
        // var list=listType;
        user.findOne({
                "name": username
            }, {
                [listType]: 1,
                _id: 0
            })
            .then((result) => {


                resolve(result);
            })
    })
}
var postBooks = function (listType, username, isbn) {

    return new Promise((resolve, reject) => {
        // var list=listType;
        console.log(`${isbn} is updating in the list`)
        user.updateOne({
            "name": username
        }, {
            $addToSet: {
                [listType]: isbn
            }
        }).then(result => {

            resolve(isbn);

        })
    })
}
var deleteBooks = function (listType, username, isbn) {

    return new Promise((resolve, reject) => {
        // var list=listType;
        console.log(`${isbn} is deleting in the list`)
        user.updateOne({
            "name": username
        }, {
            $pull: {
                [listType]: isbn
            }
        }).then(() => {
            resolve(isbn);
        })
    })
}



router.get('/list/:listType', (req, res) => {
    console.log(req.headers.username);
    console.log(req.params.listType);
    var listType = req.params.listType;
    var username = req.headers.username;
    getBooks(listType, username)
        .then(result => res.send(result));
})
router.post('/list/:listType', (req, res) => {
    console.log(req.headers.username);
    console.log(req.params.listType);
    var listType = req.params.listType;
    var username = req.headers.username;
    var isbn = req.body.isbn;
    console.log("hello WOlrd");
    validStringOrNot(isbn)
        .then(books => {
            return validBookOrNot(books)
        })
        .then(result => {
            console.log("book is present");
            return postBooks(listType, username, isbn)

        })
        .then(result => {
            console.log(result);
            res.send(`${result} is added in the list`);

        })
        .catch(err => res.send(err));

})
router.delete("/list/:listType", (req, res) => {
    console.log(req.headers.username);
    console.log(req.params.listType);
    var listType = req.params.listType;
    var username = req.headers.username;
    var isbn = req.body.isbn;
    validStringOrNot(isbn)
        .then(books => {
            return validBookOrNot(books)
        })
        .then(result => {
            console.log("book is present");
            return deleteBooks(listType, username, isbn)
        })
        .then(result => {
            res.send(JSON.stringify("BOOK DELETED") );

        })
        .catch(err => console.log(err));

})
module.exports = router;