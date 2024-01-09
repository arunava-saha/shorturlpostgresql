const express = require("express");
const { create, sendtoUrl, getAllurls } = require("../controller/controller");
const { Register, Login } = require("../controller/auth");
const router = express.Router();
// url shortner
router.post("/api/create-short-url", create);
router.get("/:id", sendtoUrl);
router.get("/v1/urls/:user", getAllurls);
// auth
router.post("/signup", Register);
router.post("/login", Login);

module.exports = { router };
