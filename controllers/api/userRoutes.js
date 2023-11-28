const express = require("express");
const router = express.Router();
const { User } = require("../models");

// Define routes
//Get all users

//get one single user

//POST route for user updates

//POST route for user login
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email exists.' });
            return;
        }
    })
})





module.exports = router;
