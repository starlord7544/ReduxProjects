const { compose } = require('@reduxjs/toolkit');
const User = require('../model/userSchema');
const bcrypt = require('bcryptjs');

module.exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({})
            .select('-password -__v -createdAt')
            .lean();

        const formattedUsers = users.map(user => ({
            id: user._id,
            username: user.username,
            email: user.email
        }));

        res.status(200).json({
            success: true,
            count: formattedUsers.length,
            users: formattedUsers
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch users',
            error: error.message
        });
    }
};

module.exports.loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Find user
        const user = await User.findOne({ username });
        if (!user) {
            res.status(401)
            res.send({
                status: 'fail',
                message: 'User not found'
            })
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            throw new Error("Incorrect Password")
        }

        res.status(200)
        res.send({
            status: 'success',
            message: 'Login successful',
            body: user,
        })
    }
    catch (err) {
        res.status(404);
        res.send({
            status: 'fail',
            message: err.message,
        });
    }
}

module.exports.registerUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!username || !password) {
            res.status(400)
            res.send({
                status: 'fail',
                message: 'Please provide username and password'
            })
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            res.status(400)
            res.send({
                status: 'fail',
                message: 'Username already exists'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            password: hashedPassword,
        });

        console.log("entry updated")
        res.status(201)
        res.send({
            status: 'success',
            message: 'User registered successfully',
            body: newUser,
        })
    } catch (err) {
        console.log(err)
        res.status(400)
        res.send({
            status: 'fail',
            message: 'Registration failed',
            error: err.message
        })
    }
}
