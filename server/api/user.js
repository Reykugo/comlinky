//API for user

const router = require('express').Router();
const mongoose = require('mongoose');

const User = mongoose.model("User");

//Call when url look like :/api/user/124562433142
router.param('user', function (req, res, next, id) {
 
    if (!id.match(/^[0-9a-fA-F]{24}$/)) {
        return res.sendStatus(422);
    }
  
    User.findById(id)
        .then(function (user) {
            if (!user) { return res.sendStatus(404); }
  
            req.user = user;
  
            return next();
        });
 });

 //create a new user
 router.post("/", (req, res) => {
    var data = req.body;
    var user = new User({
        name : data.name,
        firstName: data.firstName,
        email: data.email,
        password: data.password
    })

    //send json contains user profile after saved user
    user.save(function (err) {
        if(!err){
            res.json(user.profile()).statusCode(201)
        }
       
    })
 })

 module.exports = router;