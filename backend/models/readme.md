Purpose of this folder:
Defines the structure of data stored in the database.


Example:
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: String,
    email: String
});

module.exports = mongoose.model("User", userSchema);


Think of it as:
Blueprint of your database