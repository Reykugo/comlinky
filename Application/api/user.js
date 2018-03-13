//API for user

const router = require('express').Router();
const mongoose = require('mongoose');
const validator = require('validator'); //module to check params if param like email is valid
const User = mongoose.model("User");
const userUtils = require("../utils/userUtils")
const genericUtils = require("../utils/genericUtils")

//Call when url look like :/api/user/124562433142
// return complete user by id object if given id is correct
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

 /**
  Return all users profile
  */
 router.get("/", userUtils.isClient ,(req, res) =>{
    if (req.session.access == "admin"){
        User.find().then((users) =>{
            if(!users){return res.sendStatus(404)}
    
            return res.status(200).json({
                users: users.map((user)=>{
                    return user.profile();
                })
            })
         })
    }
    else{
        return res.status(403).send({access:false, message:"access not permitted"})
    }
   
 })

 router.get("/info", userUtils.isClient, (req, res) =>{
     User.findById(req.session.userId, function(err, user){
         if(user){
             return res.status(200).send({success:true, user: user});
         }
     })
 });

 //create a new user
 router.post("/", (req, res) => {
    var data = req.body;
    if (genericUtils.isParamsAreEmptyOrUndefined(data)){
        res.sendStatus(422);
    }
    else if (!userUtils.isSamePasswords(data.password, data.confirmPassword)){
        res.status(422).json({"error": "not same passwords"});
    }
    else if (! validator.isEmail(data.email)){
        res.status(422).json({"error":"bad email"});
    }
    else if (userUtils.isUserExists(data.email)){
        res.status(422).json({"error":"user already exists"});
    }else{
        var user = new User({
            name : data.name,
            firstName: data.firstName,
            username: data.username,
            email: data.email,
            password: data.password
        })
    
        //send json contains user profile after saved user
        user.save().then(() =>{
            res.status(201).json(user.profile()) 
        }).catch((err) =>{
            res.sendStatus(500);
        })
    }   
 })

 /**
  *Delete a user by id
  */
 router.delete("/:user", (req,res) =>{
     req.user.remove().then(function(){
        return res.sendStatus(200);
     })
 })

 /**
  Update user
  */
 router.put("/", (req, res) =>{

 })

 module.exports = router;