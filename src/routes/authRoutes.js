const express = require("express");
const router = express.Router();

const { register, login } = require("../controllers/authController");
const emailValidator = require("../middlewares/emailValidator"); 

router.post("/register", emailValidator, register);


router.post("/login",  emailValidator, login);

module.exports = router;
