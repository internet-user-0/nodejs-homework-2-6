const express = require("express");


const {register, login, getCurrent, logout, updateAvatar} = require('../../controllers/auth-controllers');
const {authenticate, upload} = require("../../middleware")

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch('/avatars', authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;