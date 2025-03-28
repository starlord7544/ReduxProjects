const express = require('express')
const userController = require('../controllers/userController')

const userRouter = express.Router()

userRouter
    .route('/')
    .get(userController.getAllUsers)

userRouter
    .route('/register')
    .post(userController.registerUser)

userRouter
    .route('/login')
    .post(userController.loginUser)

module.exports = userRouter