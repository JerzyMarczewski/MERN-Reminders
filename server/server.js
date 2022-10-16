if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const app = express();
const cors = require("cors");
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require("./models/User");
const mongoose = require('mongoose');

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors({
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200
}));

app.get("/", (req,res) => {
  // res.set('Content-Type', 'application/json')
  res.json({answer: "Hello"});
});

app.post("/register", async (req, res) => {
  const {username, password1, password2} = req.body;
  

  if(await User.findOne({username: username}))
    return res.json({message: "User with this username already exists"});

  const newUser = new User({username: username, password: password1});
  newUser.save();
  return res.status(201).json({message: "User registered"});
});

app.listen(5000)
mongoose.connect("mongodb://localhost:27017/MERN-TODO",{ useNewUrlParser: true })
  // .then(() => {
  //   const newUser = new User({
  //     username: "Jan",
  //     password: "Janek1"
  //   });
  //   newUser.save();
  // })


// app.post("/users", async (req, res) => {
//     try {
//         const hashedPassword = await bcrypt.hash(req.body.password, 10);
//         const user = {name: req.body.name, password: hashedPassword};
//         res.status(200).send(user);
//     } catch {
//         res.status(500).send();
//     }
// });

    

// .then(() => console.log("Connected to mongo"))
    // .then(() => {
    //     const newUser = new User({
    //         name: "jan",
    //         email: "jan@mail.com",
    //         password: "jan1"
    //       });

        
    //     const hp = newUser.hashPassword(newUser.password);
    //     hp.then((x) => console.log(x))
    //     newUser.save();
    // });



