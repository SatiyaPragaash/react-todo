const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const TodoModel = require('./Models/Todo')
require('dotenv').config();

const app = express()  //creates an express app
app.use(cors())
app.use(express.json()) //passed data will be converted to json format

// Use the MongoDB URI from .env
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/get', (req,res) => {
    TodoModel.find()
    .then(result => res.json(result))
    .catch(err => res.json(err))
})


app.post('/add', (req, res) => {
    const task =req.body.task;
    TodoModel.create({
    task:task
    }).then(result => res.json(result))
    .catch(err => res.json(err))
})
app.listen(3001, () => {
    console.log("Server is Running")
})