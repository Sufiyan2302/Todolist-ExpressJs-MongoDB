const express = require("express");
const router = require("./routes/routes");
const path = require("path");
const { connectMongoDb } = require("./connection");
const cookieParser = require("cookie-parser");
const { userauth } = require("./middleware/middleware");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(router);
connectMongoDb("mongodb://localhost:27017/LoginSignUp");

app.listen(5000, () => {
  console.log("server started");
});
