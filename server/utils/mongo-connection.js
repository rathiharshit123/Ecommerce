const mongoose = require("mongoose");

const config = require('../../config/config');

const mongoConnections = ()=>{
    let db = null;

    const getDb = ()=>{
        if(!db){
            return connect();
        }
        else return db;
    }

    const connect = ()=>{
        db = mongoose.createConnection(config.mongoUrl);
        return db;
    }

    connect();

    db.on('connected',function(){
        console.log("MONGO CONNECTED SUCCESFULLY")
    })

    db.on("error",function(){
        console.log("Failed to connect to mongo");
        throw new Error("Mongo connection failed")
    })

    return {
        connection: getDb()
    }
}

module.exports = mongoConnections();