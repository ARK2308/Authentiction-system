const express = require("express");
const { userRegister, userLogin, userVerify, userLogout } = require("../../controllers/user/userControllers");
const userauthenticate = require("../../middleware/user/userauthenticate");
const router = new express.Router();



router.post("/register"  , userRegister)
router.post("/login" , userLogin)

router.get("/userloggedin" ,userauthenticate , userVerify)
router.get("/logout",userauthenticate, userLogout);


module.exports = router;