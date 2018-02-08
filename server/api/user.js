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

 //Return all users
 router.get("/", (req, res) =>{
    User.find().then((users) =>{
        if(!users){return res.sendStatus(404)}

        return res.json({
            users: users.map((user)=>{
                return user.profile();
            })
        }).statusCode(200);

     })
 })

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
        }else{
            req.sendStatus(422)
        }
       
    })
 })

 //Delete user 
 router.delete("/:user", (req,res) =>{
     req.user.remove().then(function(){
         return res.sendStatus(200);
     })
 })

 //Update user
 router.put("/", (req, res) =>{

 })

 module.exports = router;