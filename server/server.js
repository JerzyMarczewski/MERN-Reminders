const express = require("express")
const app = express();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const User = require("./models/User");



app.use(express.json());

let users = [{name: "john"}, {name: "emma"}]; 

app.get("/users", (req, res) => {
    res.send(users);
});

// app.post("/users", async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         const user = {name: req.body.name, password: hashedPassword};
//         res.status(200).send(user);
//     } catch {
//         res.status(500).send();
//     }
// });

// mongoose.connect("mongodb://localhost:27017/MERN-TODO",{ useNewUrlParser: true })
//     .then(() => console.log("Connected to mongo"))
//     .then(() => {
//         const newUser = new User({
//             name: "jan",
//             email: "jan@mail.com",
//             password: "jan1"
//           });

//         newUser.save();
//     })



app.listen(5000);