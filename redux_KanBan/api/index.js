const app = require('./app')
const mongoose = require('mongoose')

const port = 6969

const url = 'mongodb://localhost:27017/'

const userName = "starlord7544"
const password = "starlord7544"

const db_url = ''

mongoose.connect(url).then(() => {
    console.log('-------------Connected to Database------------')
})

app.listen(port, () => {
    console.log('________________Server Started________________')
})