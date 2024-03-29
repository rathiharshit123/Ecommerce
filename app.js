const path = require('path');
if(process.env.NODE_ENV!="PRODUCTION") {
    require("dotenv").config({path: path.resolve(__dirname, './.env')})
}

const config = require('./config/config')
const cloudinary = require("cloudinary");
const cookieParser = require("cookie-parser");
const cors = require('cors');
const fileUpload = require("express-fileupload");
const bodyParser = require("body-parser");

const express = require("express");
const app = express();
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());
app.use(cors());


cloudinary.config(config.cloudinary);

const routes = require('./server/routes');
routes(app);

app.use(express.static(path.join(__dirname,"./client")))
app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"./client/index.html"))
})

const port = config.PORT || 5000;

// app.listen(port, ()=>{
//     console.log(`App running on port ${port} open server on`)
// })

// Only for deploying to cyclic
// Since cyclic is serverless so mongoDb should connect first only then the server should listen -> as per docs on cyclic
const mongoose = require("mongoose");
const connectDB = async () => {
    try {
      const conn = await mongoose.connect(config.mongoUrl);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
      console.log(error);
      process.exit(1);
    }
  }

//Connect to the database before listening
connectDB().then(() => {
    app.listen(port, () => {
        console.log(`listening for requests on port: ${port}`);
    })
})