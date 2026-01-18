const mongoose = require("mongoose");
const { type } = require("os");

const userschema = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    require: true,
    unique: true,
  },

  password: {
    type: String,
    require: true,
  },
});

const user = mongoose.model("users", userschema);

module.exports = { user };
