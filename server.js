//include
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mysql = require('mysql');

app.use(bodyParser.json())

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'CS304funfunfun',
	database: 'library'
});

//init routes
require('./routes/book')(app);
require('./routes/employee')(app);
require('./routes/event')(app);
require('./routes/member')(app);

//start server
app.listen(8080, function () {
  console.log('Running on port 8080...')
});