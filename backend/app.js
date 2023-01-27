const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname, './.env')})

const express = require("express");
const app = express();


const config = require('./config/config')

const port = config.PORT || 5000;

app.listen(port, ()=>{
    console.log(`App running on port ${port}`)
})