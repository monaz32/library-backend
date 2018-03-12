var express = require('express');
var mysql = require('mysql');

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: '',
	database: 'book'
});

connection.connect(function() {
	if(!!error) {
		console.log('Error');
	} else {
		console.log('Connected');
	}
})

app.get('/', function(req, resp) {
	connection.query("SELECT * FROM book", function(error, rows, fields){
		if(!!error) {
			console.log('Error in the query');
		} else {
			console.log('SUCCESs!\n')
			console.log(rows);
		}
	})
})

app.listen(1337);