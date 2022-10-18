const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase:true,
        required: true
    },
    password: {
        type: String,
        required: true
    }
});

module.exports = User = mongoose.model("users", UserSchema);