const express = require('express')
const app = express()
const port = 3000
const dotenv = require('dotenv').config()

const routes = require('./routes/routes')
const { default: mongoose } = require('mongoose')
app.use(express.json())
app.get('/', (req, res) => res.send('Hello World!'))
app.use(routes)

mongoose.connect(process.env.MONGODB_URL)
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(port, () => console.log(`Example app listening on port ${port}!`))
})
    .catch((err) => console.log(err))