const express = require("express");
const router = express.Router();
const schema = require("../schema/bookschema")



router.get("/api/searchbook", function(req, res) {
    console.log(req.query.search);
    if (req.query.search) {
       const regex = new RegExp(req.query.search, 'gi');
       console.log(regex);
       schema.find({ "title": regex }, function(err, books) {
           if(err) {
               console.log(err);
           } else {
              res.send(books);
           }
       })
       .catch(err=>{
           console.log(err);
       })
    
}
else {
    schema.find().then(books => {
        res.json(books);
  }).catch((err) => {
        res.status(404).send("no books are there "); //status 400 mean that the endpoint is valid but the resource itself does not exis
  });
}
});

module.exports = router;