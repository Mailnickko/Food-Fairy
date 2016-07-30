const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const dotenv = require('dotenv');
const path = require('path');
const favicon = require('serve-favicon');
const http = require('http');


//not configured properly maybe we can even get rid of this?
// dotenv.load();

const app = express();
//includes bodyParser and Morgan Middleware
require('./config/middleware')(app, express);
//stores routing
require('./config/routes')(app, express);



//DB Set up
  //TODO: Set up for DQL DB
//Implemented with MongoDB locally for now

// mongoose.connect('mongodb://localhost/charmander-food-fairy');

// Server Setup
const port = process.env.PORT || 4000;
const server = http.createServer(app);
server.listen(port);
console.log('Server listening on:', port);

