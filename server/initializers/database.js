const mongoose = require('mongoose');
const path = require('path')
require("dotenv").config({
    path: path.join(__dirname, '../.env')
});
// function for mongodb connection
let connectionString = `mongodb://${process.env.REPLICAS}/${process.env.DATABASE}`;
connectionString = connectionString.trim();
const connectMongoDB = () => {
    // When successfully connected
    mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false }).then(() => {
        console.log('Connected to the Database successfully')
    });
    // If the connection throws an error
    mongoose.connection.on('error', function (err) {
        console.log('Mongoose default connection error: ' + err);
    });

    // // When the connection is disconnected
    mongoose.connection.on('disconnected', function () {
        console.log('Mongoose default connection disconnected');
    });

    // If the Node process ends, close the Mongoose connection 
    process.on('exit', function () {
        console.log('Goodbye!!! Node Server stoped');
    });

    process.on('SIGINT', function () {
        mongoose.connection.close(function () {
            console.log('Mongoose default connection disconnected through app termination');
            process.exit(0);
        });
    });
}

module.exports = {
    connectMongoDB: connectMongoDB
}