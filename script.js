var express = require('express');
var mysql = require('mysql');
var app = express();

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'Cs304funfunfun',
	database: 'library'
});

connection.connect(function(error) {
	if(!!error) {
		console.log('Error\n');
		throw error;
	}
	console.log('Connected\n');

	connection.query('SELECT * FROM book', function(error, rows, fields){
		if(!!error) {
			console.log('Error in the query\n');
			throw error;
		}
		console.log('query SUCCESS!\n')
		console.log(rows);

		connection.end();
	});
});

