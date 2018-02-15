//This file is used to instantiate route

var router = require('express').Router();
router.use("/user", require("./user"));
router.use("/authentification", require("./authentification"))

module.exports = router;

