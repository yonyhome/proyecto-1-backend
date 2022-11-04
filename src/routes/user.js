const express = require('express');
const userSchema = require("../models/user");

const router = express.Router();

// create user
router.post("/users", (req, res) => {
    const user = userSchema(req.body);
    user
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

router.get("/users", (req, res) => {
    userSchema
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json({ message: err }));
});

module.exports = router