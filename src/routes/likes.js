const express = require('express');
const likeSchema = require("../models/likes");
const publicationSchema = require("../models/publication");

const router = express.Router();

// create like
router.post("/likes", (req, res) => {
    const like = likeSchema(req.body);
    like
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

//
router.get("/publications/likes/:id", async (req , res) => {
    const { id } = req.params;
    let users = await likeSchema.find({user:id});
    console.log(users);
    
    if(!users){
      return res.json({message: 'USERS CANNOT BE FOUNDED'})
       
    }
    let publications = [];

    for( const u of users){
        let publication = await publicationSchema
        .find({_id: u.publication})
        .catch((err) => res.json({ message: err }));
        publications.push(publication);
    }
    res.json(publications);
    
});

//delete like
router.delete("/likes/:id", (req, res) => {
    const { id } = req.params;
    likeSchema
        .deleteOne({_id: id})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

module.exports = router;