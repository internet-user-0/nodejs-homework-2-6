const express = require("express");


const {register, login, getCurrent, logout} = require('../../controllers/auth-controllers');
const {authenticate} = require("../../middleware")


const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);

module.exports = router;