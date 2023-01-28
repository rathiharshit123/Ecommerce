const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname, './.env')})

const cookieParser = require("cookie-parser");

const express = require("express");
const app = express();
app.use(express.json());
app.use(cookieParser);


const routes = require('./server/routes');
routes(app);

const config = require('./config/config')
const port = config.PORT || 5000;

app.listen(port, ()=>{
    console.log(`App running on port ${port} open server on`)
})