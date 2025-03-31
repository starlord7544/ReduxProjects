const app = require('./app')
const mongoose = require('mongoose')

const port = 6969

const url = 'mongodb://localhost:27017/'
const atlasUrl = 'mongodb+srv://<username>:<db_password>@kanbancluster.rtijayi.mongodb.net/'


const userName = "starlord7544"
const password = "starlord7544"

const db_url = atlasUrl.replace('<username>', userName).replace('<db_password>', password)

mongoose.connect(db_url).then(() => {
    console.log('-------------Connected to Database------------')
})

app.listen(port, () => {
    console.log('________________Server Started________________')
})