const mongoose = require("mongoose");

const ItemSchema = new mongoose.Schema({ 
    name: string,
    date: date,
    done: bool
});