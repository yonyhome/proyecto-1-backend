const express = require('express');

const followerSchema = require("../models/follower");

const router = express.Router();

// create follower
router.post("/followers", (req, res) => {
    const follower = followerSchema(req.body);
    follower
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

// get followers by id
router.get("/followers/:id", (req, res) => {
    const { id } = req.params;
    followerSchema
        .find({follower: id})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

// delete follower by id
router.delete("/followers/:id", (req, res) => {
    const { id } = req.params;
    followerSchema
        .deleteOne({_id: id})
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

module.exports = router
