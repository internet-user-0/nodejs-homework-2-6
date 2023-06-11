const express = require("express");


const {register, login, getCurrent, logout, updateAvatar, verify, resendVerifyEmail} = require('../../controllers/auth-controllers');
const {authenticate, upload} = require("../../middleware")

const router = express.Router();

router.post("/register", register);
router.get('/verify/:verifikationCode', verify );
router.post('/verify', resendVerifyEmail );


router.post("/login", login);
router.get("/current", authenticate, getCurrent);
router.post("/logout", authenticate, logout);
router.patch('/avatars', authenticate, upload.single("avatar"), updateAvatar);

module.exports = router;