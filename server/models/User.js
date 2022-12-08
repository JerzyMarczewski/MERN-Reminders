const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const ItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: null,
  },
  done: {
    type: Boolean,
    default: false,
  },
});

const ListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: "45B3E7",
  },
  icon: {
    type: String,
    default: "ic:round-format-list-bulleted",
  },
  items: [ItemSchema],
});

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  lists: [ListSchema],
});

module.exports = User = mongoose.model("users", UserSchema);
