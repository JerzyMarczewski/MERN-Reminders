const express = require("express")
const bcrypt = require("bcrypt");
const app = express();

app.use(express.json());

let users = [{name: "john"}, {name: "emma"}]; 

app.get("/users", (req, res) => {
    res.send(users);
});

app.post("/users", async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const user = {name: req.body.name, password: hashedPassword};
        res.status(200).send(user);
    } catch {
        res.status(500).send();
    }
});

app.listen(5000);