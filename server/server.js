const express = require('express');
const app = express();
const cors = require("cors");
const bcrypt = require('bcrypt');
const passport = require('passport');
const User = require("./models/User");
const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/.env'});

app.use(express.urlencoded({ extended: false }))
app.use(express.json());
app.use(cors({
  origin:'*', 
  credentials:true,
  optionSuccessStatus:200
}));

app.post("/register", async (req, res) => {
  const {username, password} = req.body;

  if (await User.findOne({username: username}))
    return res.json({ok: false, message: "User with this username already exists"});

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({username: username, password: hashedPassword});
  newUser.save().catch(err => console.log(err));

  return res.json({ok: true, message: "User registered"});
});

app.post("/login", async (req, res) => {
  const {username, password} = req.body;

  User.findOne({username: username})
    .then(user => {
      if (!user) return res.json({ok: false, message: "User doesn't exist"});
      
      return bcrypt.compare(password, user.password);
    }).then(comparingResult => {
      if (!comparingResult) return res.json({ok: false, message: "Wrong username or password"});

      return res.json({ok: true, message: "User logged in successfully"});
    })
});

app.get("/:username/lists", async (req, res) => {
  const user = await User.findOne({username: req.params.username});

  res.send(user.lists);

});

// ! only for testing
app.post("/:username/lists/add", async (req, res) => {
  const {name, color} = req.body;

  const user = await User.findOne({username: req.params.username});

  user.lists.push({name: name, color: color});
  const subdoc = user.lists[0];
  console.log(subdoc);

  user.save(function (err) {
    if (err) return handleError(err)
    console.log('Success!');
  });
});

// ! only for testing
app.post("/:username/lists/remove", async (req, res) => {
  const {id} = req.body;
  const user = await User.findOne({username: req.params.username});

  if (!user) console.log("user not found!");

  user.lists.id(id).remove();

  user.save(function (err) {
    if (err) return handleError(err)
    console.log('Success!');
  });
});


app.post("/:username/lists/items/add", async (req, res) => {
  const {listId, name, date} = req.body;
  const user = await User.findOne({username: req.params.username});
  const list = user.lists.id(listId);

  list.items.push({name: name, date: date});

  user.save((err) => {
    if (err) return res.json({ok: false, message: "Item added unsuccesfully"});
    
    return res.json({ok: true, message: "Item added succesfully"});
  });
});

app.post("/:username/lists/items/edit-name", async (req, res) => {
  const {listId, itemId, name: newName} = req.body;
  const user = await User.findOne({username: req.params.username});
  const list = user.lists.id(listId);
  const item = list.items.id(itemId);

  item.name = newName;

  user.save((err) => {
    if (err) return res.json({ok: false, message: "Item edited unsuccesfully"});
    
    return res.json({ok: true, message: "Item edited succesfully"});
  });
});

app.post("/:username/lists/items/remove", async (req, res) => {
  const {listId, itemId} = req.body;
  const user = await User.findOne({username: req.params.username});
  const list = user.lists.id(listId);
  const item = list.items.id(itemId);

  item.remove();

  user.save((err) => {
    if (err) return res.json({ok: false, message: "Item removed unsuccesfully"});
    
    return res.json({ok: true, message: "Item removed succesfully"});
  });
});


app.listen(process.env.PORT, () => console.log(`Listening on port ${process.env.PORT}`));


mongoose.connect(process.env.DB, { useNewUrlParser: true });
mongoose.connection.on("error", (e) => {
  console.log("mongo connect error!");
});
mongoose.connection.on("connected", () => {
  console.log("connected to mongo");
});

  