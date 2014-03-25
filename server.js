var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require("mongoose");
var port = process.env.PORT || 3000;
var db = require("./app/db");
var app = express();

mongoose.connect(db.connectionString);

app.use(express.static(__dirname + '/public'));
app.use(morgan('dev'));
app.use(bodyParser());
app.use(methodOverride());

require("./app/routes")(app);

app.listen(port);
console.log('MEAN USER CRUD running on port ' + port);