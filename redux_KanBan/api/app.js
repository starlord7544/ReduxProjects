const express = require('express')
const cors = require('cors')
const userRouter = require('./routes/userRouter')

const app = express()

// const userRouter

app.use(express.json());
app.use(cors())
app.use('/api/v1/users', userRouter)

module.exports = app