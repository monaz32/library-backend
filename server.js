//include
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var app = express();
var mysql = require('mysql');

app.use(bodyParser.json())

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Cs304funfunfun',
	database: 'library'
});


connection.connect(function(err) {
	if (err){
		console.log('Error connecting to database\n');
	 	throw err;
	}
});

exports.connection = connection;

//init routes
require('./routes/book')(app);
require('./routes/employee')(app);
require('./routes/event')(app);
require('./routes/member')(app);
require('./routes/schedules')(app);
require('./routes/branches')(app);

//start server
app.listen(8080, function () {
  console.log('Running on port 8080...')
});