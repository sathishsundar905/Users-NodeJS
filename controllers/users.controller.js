const UsersModel = require("../model/users.model");
const LoginUsersModel = require("../model/loginUsers.model");
const jwt = require("jsonwebtoken");
require('dotenv').config();

exports.validateUser = async (req, res, next) => {
    try {
        const validatedUser = await LoginUsersModel.findOne({ userName: req.body.userName });
        if (validatedUser) {
            const userDetail = await UsersModel.findOne({ userName: req.body.userName });
            const token = jwt.sign(
                { user_id: userDetail._id, userName: req.body.userName },
                process.env.TOKEN_KEY,
                {
                    expiresIn: "1h",
                }
            );

            userDetail.token = token;
            res.status(200).json(userDetail);
        } else {
            res.status(500).json({ message: "Invalid User Credentials" });
        }
    } catch (err) {
        next(err);
    }

};

exports.createUser = async (req, res, next) => {
    try {
        const validatedUser = await LoginUsersModel.findOne({ userName: req.body.userName });
        if (!validatedUser) {
            const createdLoginUserModel = await LoginUsersModel.create(req.body);
            req.body.loginUserId = createdLoginUserModel._id;
            const createdUserModel = await UsersModel.create(req.body);
            res.status(201).json(createdUserModel);
        } else {
            res.status(500).json({ message: "User Already Exists" });
        }


    } catch (err) {
        next(err);
    }

};

exports.getUsers = async (req, res, next) => {
    try {
        const users = await UsersModel.find({});
        res.status(200).json(users || []);
    } catch (err) {
        next(err);
    }

};

exports.getUserById = async (req, res, next) => {
    try {
        const userData = await UsersModel.findById(req.params.userId);
        if (userData) {
            res.status(200).json(userData);
        } else {
            res.status(400).send();
        }
    } catch (err) {
        next(err);
    }

};

exports.updateUser = async (req, res, next) => {
    try {
        const userData = await UsersModel.findByIdAndUpdate(req.params.userId, req.body, {
            new: true,
            findAndModify: false
        });
        const userLoginData = await LoginUsersModel.findByIdAndUpdate(req.body.loginUserId, req.body, {
            new: true,
            findAndModify: false
        });
        if (userData) {
            res.status(200).json(userData);
        } else {
            res.status(400).send();
        }
    } catch (err) {
        next(err);
    }

};

exports.deleteUser = async (req, res, next) => {
    try {
        const userLoginData = await LoginUsersModel.findOneAndDelete({ userName: req.body.userName });
        const userData = await UsersModel.findByIdAndDelete(req.params.userId);
        if (userData) {
            res.status(200).json(userData);
        } else {
            res.status(400).send();
        }
    } catch (err) {
        next(err);
    }

}; 