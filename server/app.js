const express = require('express');
const bodyParser = require('body-parser');
const path = require('path')
const db = require('./initializers/database.js');
const middleware = require('./initializers/middleware.js');
require("dotenv").config({
  path: path.join(__dirname, '/.env')
});
const app = express();
// MongoDB Connection
db.connectMongoDB();
// create application/json parser 
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// verify your request jwt token
app.use(middleware.verifyToken)
require('./routes.js')(app);
// error hndlers
app.use(middleware.pageNotFound);
app.use(middleware.internalServerError);
app.use(middleware.requestTimeOut);
// router configure  

module.exports = app;

