const { user } = require("../model/userschema");
const { todolistdata } = require("../model/todoschema");
const { v4: uuidv4 } = require("uuid");
const { setUser } = require("../service/auth");

async function Homepage(req, res) {
  return res.render("todolist");
}

async function LoginPage(req, res) {
  return res.render("login");
}

async function SignupPage(req, res) {
  return res.render("signup");
}

async function Signupauth(req, res) {
  const body = req.body;

  const userdata = await user.create({
    name: body.name,
    email: body.email,
    password: body.password,
  });
  return res.redirect("/login");
}

async function Loginauth(req, res) {
  const body = req.body;
  const DBuser = await user.findOne({
    email: body.email,
    password: body.password,
  });

  if (!DBuser) {
    return res.render("login", {
      error: "incorrect email or password",
    });
  }
  // const sessionId = uuidv4();
  // setUser(sessionId, DBuser);
  const token = setUser(DBuser);
  res.cookie("uid", token);
  return res.redirect("/");
}

async function createTodo(req, res) {
  const existingTodo = await todolistdata.findOne({
    createdBy: req.user._id,
  });
  let todoresponse;
  if (!existingTodo) {
    todoresponse = await todolistdata.create({
      Todo: req.body,
      createdBy: req.user._id,
    });
  } else {
    todoresponse = await todolistdata.updateOne(
      { createdBy: req.user._id },
      { $push: { Todo: { $each: req.body } } }
    );
  }

  return res.status(200).end("Sucessful add to collections");
}

async function ApiResponce(req, res) {
  try {
    const allDBtodo = await todolistdata.find({ createdBy: req.user._id });
    return res.send({ Todo: allDBtodo });
  } catch (err) {
    console.error(err);
    res.status(500).json(doc?.Todo || []);
  }
}

async function deletefromDB(req, res) {
  const index = Number(req.params.index);

  const doc = await todolistdata.findOne({ createdBy: req.user._id });
  if (!doc) return res.json([]);

  doc.Todo.splice(index, 1);
  await doc.save();

  res.json(doc.Todo);
}

module.exports = {
  Homepage,
  LoginPage,
  SignupPage,
  Loginauth,
  Signupauth,
  createTodo,
  ApiResponce,
  deletefromDB,
};
