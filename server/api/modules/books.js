const express = require("express");
const router = express.Router();
const schema = require("../schema/bookschema")
//getting books api
router.get('/api/bookstore', (req, res) => {
      console.log(req.query.search);
      if (req.query.search) {
            const regex = new RegExp(req.query.search, 'gi');
           
            schema.find({
                        "title": regex
                  }, function (err, books) {
                        
                        if(books.length>=1) {
                              res.send(books);
                              
                        }
                        else{
                             
                              res.send("409");   
                              
                        }
                  })
                  .catch(err => {
                        console.log(err);
                  })

      } else {
            schema.find().then(books => {
                  res.json(books);
            }).catch((err) => {
                  res.status(404).send("no books are there "); //status 400 mean that the endpoint is valid but the resource itself does not exis
            });
      }
});

//api for book id searching
router.get('/api/bookstore/:id', (req, res) => {
      var bookIdToBeSearch = req.params.id;

      var id = parseInt(bookIdToBeSearch);
      console.log(bookIdToBeSearch)
      var re = new RegExp(/^(\d{13})$/);
      console.log(re.test(id));
      if (re.test(bookIdToBeSearch)) { //if book id is of 13 no size then search that book in book database

            schema.find({
                  isbn: bookIdToBeSearch
            }).then(books => {
                  if (books.length >= 1)
                        res.json(books);
                  else
                        res.status(404).json({
                              message: "book not found"
                        });
            }).catch((err) => {
                  res.status(400).send(err)


            });
      } else {
            console.log("Invalid search the search should be a 13 digit number");
      }

});
module.exports = router;