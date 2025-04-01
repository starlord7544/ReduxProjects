const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is mandatory"],
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: [true, "Password is mandatory"],
    },
    assignedTasks: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
        index : true
    }]
    // email: {
    //     type: String,
    //     unique: true,
    //     trim: true,
    //     sparse: true,
    // },
    // createdAt: {
    //     type: Date,
    //     default: Date.now
    // }
})

const User = mongoose.model('User', userSchema)
module.exports = User