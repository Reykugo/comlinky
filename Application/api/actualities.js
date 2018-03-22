const router = require('express').Router();
const mongoose = require('mongoose');

const User = mongoose.model("User");
const userUtils = require("../utils/userUtils")
const genericUtils = require("../utils/genericUtils")



router.get("/twitter", userUtils.isClient, (req, res) =>{
    User.findById(req.session.userId, function(err, user){
        if (user){
            //just for testing , normally send list of twit
            return res.status(200).send({token: user.twitterToken})
        }
    })
})

router.post("/twitter", userUtils.isClient, (req, res) =>{
    User.findById(req.session.userId, function(err, user){
        if (user){
            if (genericUtils.isEmpty(req.body.twitterToken)){
                return res.status(400).send({success:false, error: "twitter token is empty"});
            }
            user.twitterToken = req.body.token;
            user.save().then(saved_user => {
                return res.status(200).send({success:true})
            }).catch(e =>{
                console.log(e);
                return res.sendStatus(500);
            })
        }
    })
})

router.get("/youtube", userUtils.isClient, (req, res) =>{
    User.findById(req.session.userId, function(err, user){
        if (user){
            return res.status(200).send({token: user.youtubeToken})
        }
    })
})


router.post("/youtube", userUtils.isClient, (req, res) =>{
    User.findById(req.session.userId, function(err, user){
        if (user){
            if (genericUtils.isEmpty(req.body.youtubeToken)){
                return res.status(400).send({success:false, error: "youtube token is empty"});
            }
            user.youtubeToken = req.body.token;
            user.save().then(saved_user => {
                return res.status(200).send({success:true})
            }).catch(e =>{
                console.log(e);
                return res.sendStatus(500);
            })
        }
    })
})

router.get("/instagram", userUtils.isClient, (req, res) =>{
    User.findById(req.session.userId, function(err, user){
        if (user){
            return res.status(200).send({token: user.instagramToken})
        }
    })
})


router.post("/instagram", userUtils.isClient, (req, res) =>{
    User.findById(req.session.userId, function(err, user){
        if (user){
            if (genericUtils.isEmpty(req.body.instagramToken)){
                return res.status(400).send({success:false, error: "instagram token is empty"});
            }
            user.instagramToken = req.body.token;
            user.save().then(saved_user => {
                return res.status(200).send({success:true})
            }).catch(e =>{
                console.log(e);
                return res.sendStatus(500);
            })
        }
    })
})
