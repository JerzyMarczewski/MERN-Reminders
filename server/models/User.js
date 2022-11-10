const mongoose = require("mongoose");
const bcrypt = require("bcrypt");


const ItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: null
    },
    done: {
        type: Boolean,
        default: false
    }
});

const ListSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    // ! length must be 6
    color: {
        type: String,
        required: true
    },
    items: [ItemSchema]
});

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        lowercase:true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    lists: [ListSchema]
});

module.exports = User = mongoose.model("users", UserSchema);