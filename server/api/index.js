//This file is used to instantiate route

var router = require('express').Router();
router.use("/user", require("./user"));

module.exports = router;

