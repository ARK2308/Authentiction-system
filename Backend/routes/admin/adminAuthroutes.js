const express = require("express");
const { Register, Login, AdminVerify, Logout } = require("../../controllers/admin/adminControllers");
const adminauthenticate = require("../../middleware/admin/adminauthenticate");
const router = express.Router();

// Admin authentication routes
router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", adminauthenticate, Logout)

// admin verify 
router.get("/adminverify", adminauthenticate, AdminVerify)
module.exports = router;
