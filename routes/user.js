const express = require('express');
const bcryptjs = require('bcryptjs');
const User = require('../models/User');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("user");
});
router.post("/register", (req, res) => {
    const {
        username,
        password
    } = req.body;

    bcryptjs.hash(password, 10).then(hash => {
        const user = new User({
            username,
            password:hash
        });
        const addUser = user.save();
        addUser.then(data => res.json(data)).catch(err => res.json(err));
    });
});


module.exports = router;