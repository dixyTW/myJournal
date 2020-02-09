const express = require("express");
const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
const config = require('config')

const app = express()

// app.use(bodyParser.json());
app.use(express.json());


const db = config.get("mongoURI");

mongoose
    .connect(db)
    .then(( () => console.log('MongoDB Connected... ')))
    .catch(err => console.log(err));


app.use('/api/users', require('./routes/api/users'));  
app.use('/api/auth', require('./routes/api/auth'));  
app.use('/api/entry', require('./routes/api/entry'));  


const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`)); 