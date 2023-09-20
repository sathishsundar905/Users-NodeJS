const mongoose = require("mongoose");

const LoginUsersSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    token:{
        type: String,
        required: false
    },
})

const LoginUsersModel = mongoose.model("LoginUsers",LoginUsersSchema);

module.exports = LoginUsersModel;