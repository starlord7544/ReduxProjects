const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : {
        type : String,
        required: [true , "Username is mandatory"],
        unique : true,
    },
    password : {
        type : String,
        required: [true , "Password is mandatory"],
    }
})

const User = mongoose.model('User', userSchema)
module.exports = User