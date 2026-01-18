const express = require("express");
const { user } = require("../model/userschema");
const { todolistdata } = require("../model/todoschema");
const {
  Homepage,
  LoginPage,
  SignupPage,
  Loginauth,
  Signupauth,
  createTodo,
  ApiResponce,
  deletefromDB,
} = require("../controller/controller");
const { userauth } = require("../middleware/middleware");
const { error } = require("console");
const router = express.Router();

router.get("/", userauth, Homepage);

router.get("/login", LoginPage);

router.get("/signup", SignupPage);

router.post("/signup", Signupauth);

router.post("/login", Loginauth);

router.post("/", userauth, createTodo);

router.get("/api/todo", userauth, ApiResponce);

router.delete("/todo/:index", userauth, deletefromDB);
module.exports = router;
