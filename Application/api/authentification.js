//API for authentification

const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const validator = require('validator'); //module to check params if param like email is valid
const userUtils = require("../utils/user")
const jwt = require("jsonwebtoken");

router.post("/signIn", (req, res) =>{
    var data = req.body;
    console.log(data);
    if (validator.isEmail(data.email)){
        User.findOne({"email": data.email}, function(err, user){
            if(user){
                user.comparePasswords( data.password, function(err, isMatch){
                    if(isMatch){
                        const payload = {
                            access: user.access,
                            user: user.email 
                        };
                        var token = jwt.sign(payload, "pwd", {
                            expiresIn: 1440 // expires in 24 hours
                        });
                        // return the information including token as JSON
                        res.status(201).json({token: token}); 
                    }else{
                        res.sendStatus(402);
                    }
                })
            }
        })
    }
   
    
})


module.exports = router;