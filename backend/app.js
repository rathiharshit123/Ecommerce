const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname, './.env')})

const logger = require('./server/utils/logger');

const express = require("express");
const app = express();
app.use(express.json());


const routes = require('./server/routes');
routes(app);

const config = require('./config/config')
const port = config.PORT || 5000;

app.listen(port, ()=>{
    console.log(`App running on port ${port} open server on`)
})