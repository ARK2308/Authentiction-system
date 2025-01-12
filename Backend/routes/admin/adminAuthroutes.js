const express = require("express");
const { Register, Login, AdminVerify, Logout } = require("../../controllers/admin/adminControllers");
const adminauthenticate = require("../../middleware/admin/adminauthenticate");

const router = express.Router();

// Routes
router.post("/register", Register);
router.post("/login", Login);
router.get("/logout", adminauthenticate, Logout);
router.get("/adminverify", adminauthenticate, AdminVerify);

module.exports = router;
