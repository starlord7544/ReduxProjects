const { compose } = require('@reduxjs/toolkit');
const User = require('../model/userSchema');

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200)
        res.send({
            status: 'success',
            body: users,
        })
    } catch (err) {
        res.status(400)
        res.send({
            status: 'fail',
            message: err.message
        })
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) {
            res.status(404)
            res.send({
                status: 'fail',
                message: 'User not found'
            })
        }
        if (user.password !== req.body.password) {
            throw new Error("Incorrect Password")
        }

        res.status(200)
        res.send({
            status: 'success',
            body: user,
        })
    }
    catch (err) {
        res.status(404);
        res.json({
            status: 'fail',
            message: err.message,
        });
    }
}

module.exports.registerUser = async (req, res) => {
    try {
        const newUser = await User.create(req.body)
        console.log("entry updated")
        res.status(201)
        res.send({
            status: 'success',
            body: newUser,
        })
    } catch (err) {
        console.log(err)
        res.status(400)
        res.send({
            status: 'fail',
            message: err.message
        })
    }
}