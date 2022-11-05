const express = require('express');
const likeSchema = require("../models/likes");
const publicationSchema = require("../models/publication");
const userSchema = require("../models/user");
const followerSchema = require("../models/follower");

const router = express.Router();

//create publication
router.post("/publications", (req, res) => {
    const publication = publicationSchema(req.body);
    publication
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

// get timeline publications

router.get("/publications/timeline/:id", async (req , res) => {
    const { id } = req.params;
    let users = await followerSchema.find({follower:id});
    console.log(users);
    
    if(!users){
      return res.json({message: 'USERS CANNOT BE FOUNDED'})
       
    }
    let publications = [];

    for( const user of users){
        let publication = await publicationSchema
        .find({author: user.followed})
        .catch((err) => res.json({ message: err }));
        publications.push(publication);
    }
    res.json(publications);
    
});
// get publication by id
router.get("/publications/:id", (req, res) => {
    const { id } = req.params;
    publicationSchema
        .findById(id)
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

// update publication by id
router.put("/publications/:id", (req, res) => {
    const { id } = req.params;
    const { description} = req.body;
    publicationSchema
        .updateOne({_id: id},{$set: {description}})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

module.exports = router