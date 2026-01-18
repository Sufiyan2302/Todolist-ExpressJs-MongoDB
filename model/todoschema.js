const mongoose = require("mongoose");

const todoschema = mongoose.Schema({
  Todo: { type: Array },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
});

const todolistdata = mongoose.model("tododata", todoschema);

module.exports = { todolistdata };
