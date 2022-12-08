const express = require("express");
const app = express();
const cors = require("cors");
const bcrypt = require("bcryptjs");
const User = require("./models/User");
const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    credentials: true,
    optionSuccessStatus: 200,
  })
);

app.post("/register", async (req, res) => {
  const { username, password } = req.body;

  if (await User.findOne({ username: username }))
    return res.json({
      ok: false,
      message: "User with this username already exists",
    });

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ username: username, password: hashedPassword });
  newUser.save().catch((err) => console.log(err));

  return res.json({ ok: true, message: "User registered" });
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username: username });

  if (!user) return res.json({ ok: false, message: "User doesn't exist" });

  const comparingResult = await bcrypt.compare(password, user.password);

  if (!comparingResult)
    return res.json({ ok: false, message: "Wrong username or password" });

  return res.json({ ok: true, message: "User logged in successfully" });
});

app.get("/:username/lists", async (req, res) => {
  const user = await User.findOne({ username: req.params.username });

  res.send(user.lists);
});

app.post("/:username/lists/add", async (req, res) => {
  const { name, color, icon } = req.body;

  const user = await User.findOne({ username: req.params.username });

  user.lists.push({ name: name, color: color, icon: icon });

  user.save((err) => {
    if (err)
      return res.json({ ok: false, message: "List added unsuccesfully" });

    return res.json({ ok: true, message: "List added succesfully" });
  });
});

app.post("/:username/lists/edit", async (req, res) => {
  const { listId, newName, newColor, newIcon } = req.body;

  const user = await User.findOne({ username: req.params.username });
  const list = user.lists.id(listId);

  list.name = newName;
  list.color = newColor;
  list.icon = newIcon;

  user.save((err) => {
    if (err)
      return res.json({ ok: false, message: "List added unsuccesfully" });

    return res.json({ ok: true, message: "List added succesfully" });
  });
});

app.post("/:username/lists/remove", async (req, res) => {
  const { listId } = req.body;
  const user = await User.findOne({ username: req.params.username });

  if (!user) console.log("user not found!");

  user.lists.id(listId).remove();

  user.save((err) => {
    if (err)
      return res.json({ ok: false, message: "List removed unsuccesfully" });

    return res.json({ ok: true, message: "List removed succesfully" });
  });
});

app.post("/:username/lists/items/add", async (req, res) => {
  const { listId, name, date } = req.body;
  const user = await User.findOne({ username: req.params.username });
  const list = user.lists.id(listId);

  list.items.push({ name: name, date: date });

  user.save((err) => {
    if (err)
      return res.json({ ok: false, message: "Item added unsuccesfully" });

    return res.json({ ok: true, message: "Item added succesfully" });
  });
});

app.post("/:username/lists/items/edit-name", async (req, res) => {
  const { listId, itemId, name: newName } = req.body;
  const user = await User.findOne({ username: req.params.username });
  const list = user.lists.id(listId);
  const item = list.items.id(itemId);

  item.name = newName;

  user.save((err) => {
    if (err)
      return res.json({ ok: false, message: "Item edited unsuccesfully" });

    return res.json({ ok: true, message: "Item edited succesfully" });
  });
});

app.post("/:username/lists/items/edit-status", async (req, res) => {
  const { listId, itemId } = req.body;
  const user = await User.findOne({ username: req.params.username });
  const list = await user.lists.id(listId);
  const item = await list.items.id(itemId);

  item.done = !item.done;

  user.save((err) => {
    if (err)
      return res.json({
        ok: false,
        message: "Item's status edited unsuccesfully",
      });

    return res.json({ ok: true, message: "Item's status edited succesfully" });
  });
});

app.post("/:username/lists/items/remove", async (req, res) => {
  const { listId, itemId } = req.body;
  const user = await User.findOne({ username: req.params.username });
  const list = user.lists.id(listId);
  const item = list.items.id(itemId);

  item.remove();

  user.save((err) => {
    if (err)
      return res.json({ ok: false, message: "Item removed unsuccesfully" });

    return res.json({ ok: true, message: "Item removed succesfully" });
  });
});

app.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);

mongoose.connect(process.env.DB, { useNewUrlParser: true });
mongoose.connection.on("error", (e) => {
  console.log("Mongo connect error!");
});
mongoose.connection.on("connected", () => {
  console.log("Connected to Mongo");
});
