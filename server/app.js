require('dotenv').config()
const express = require('express')
const router = require('./routes')
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');


const port = process.env.PORT || 5000

const app = express()

app.use('/', router)

app.use(cors())
app.use(morgan('dev'))

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())



app.listen(port, () => {
    console.log("Server started on port " + port)
})