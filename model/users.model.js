const mongoose = require("mongoose");

const UsersSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    sex: {
        type: String,
        required: true
    },
    userRole: {
        type: String,
        required: true
    },
    loginUserId:{
        type: String,
        required: true
    },
    token:{
        type: String,
        required: false
    }
})

const UsersModel = mongoose.model("Users",UsersSchema);

module.exports = UsersModel;