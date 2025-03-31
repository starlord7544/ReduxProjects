const express = require('express')
const taskController = require('../controllers/taskController')

const taskRouter = express.Router()

taskRouter
    .route('/create')
    .post(taskController.createTask)

taskRouter
    .route('/getUserTasks')
    .get(taskController.getUserTasks)

    taskRouter
    .route('/assigned/:userId')
    .get(taskController.getAssignedTasks)

taskRouter
    .route('/update/:id')
    .put(taskController.updateTask)

taskRouter
    .route('/delete/:id')
    .delete(taskController.deleteTask)

taskRouter
    .route('/move/:id/move')
    .put(taskController.moveTask)

taskRouter
    .route('/assignUsers/:id/assign')
    .put(taskController.assignUsers)


module.exports = taskRouter