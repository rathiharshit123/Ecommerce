const path = require('path');
const dotenv = require('dotenv');
dotenv.config({path: path.resolve(__dirname, './.env')})

const config = require('./config/config')
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());

cloudinary.config(config.cloudinary);

const routes = require('./server/routes');
routes(app);

const port = config.PORT || 5000;

app.listen(port, ()=>{
    console.log(`App running on port ${port} open server on`)
})