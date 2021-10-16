const router = require("express").Router();

const { signIn, signUp } = require("../controllers/auth.controller");

// register
router.post("/register", signUp);

// login
router.post("/login", signIn);

module.exports = router;
