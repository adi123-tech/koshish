
const express = require('express')
const dotenv = require('dotenv')
const School = require('./model/schoolSchema')
const Student = require('./model/studentSchema')
const cookieParser = require('cookie-parser');
const app = express()


app.use(cookieParser());


dotenv.config({path: './config.env'})
const PORT = process.env.PORT
require('./db/conn')


app.use(express.json())
app.use(require('./routes/auth'))

app.listen(PORT, () => {
    console.log(`Server is Runnning on ${PORT}`);
})
app.get('/getUsers', (req, res) => {
    Student.find()
    .then(users => res.json(users))
    .catch(err => res.json(err))
})