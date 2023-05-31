const express = require("express");


const {register, login} = require('../../controllers/auth-controllers');


const router = express.Router();

router.post("/register", register);
router.post("/loin", login);

module.exports = router;