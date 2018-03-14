//API for authentification

const router = require('express').Router();
const mongoose = require('mongoose');
const User = mongoose.model("User");
const validator = require('validator'); //module to check params if param like email is valid
const userUtils = require("../utils/userUtils")
const jwt = require("jsonwebtoken");
const config = require("../utils/config");


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
                            userId: user.id, 
                        };
                    
                        var token = jwt.sign(payload, config.superSecret, {
                            expiresIn: 86400 // expires in 24 hours
                        });
                        res.cookie("token", token, { maxAge: 24*3600*1000, httpOnly: true })
                        // return the information including token as JSON
                        res.status(200).json({token:token, sucess:true}); 
                    }else{
                        res.sendStatus(400);
                    }
                })
            }else{
                res.sendStatus(400);
            }
        })
    }
   
})

router.get("/logOut",userUtils.isClient, (req, res) =>{
    res.clearCookie("token");
    res.status(200).send({success:true})
})


module.exports = router;