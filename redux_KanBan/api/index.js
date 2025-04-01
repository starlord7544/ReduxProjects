const app = require('./app')
const mongoose = require('mongoose')

const port = 6969

const url = 'mongodb://localhost:27017/'
const atlasUrl = 'mongodb+srv://<username>:<db_password>@kanbancluster.rtijayi.mongodb.net/'

const REQ_INTERVAL = 300000 // 5 minutes

const API_PING_URL = "https://reduxprojects.onrender.com/ping"


const userName = "starlord7544"
const password = "starlord7544"

const db_url = atlasUrl.replace('<username>', userName).replace('<db_password>', password)

setInterval(() => {
    fetch(API_PING_URL) 
        .then(response => console.log("Self-ping successful:", response.status))
        .catch(error => console.error("Self-ping failed:", error));
}, REQ_INTERVAL)

mongoose.connect(db_url).then(() => {
    console.log('-------------Connected to Database------------')
})

app.listen(port, () => {
    console.log('________________Server Started________________')
})