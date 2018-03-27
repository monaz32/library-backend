//routes
module.exports = function(app) {  
    app.route('/rating/max')
        .get(getMAXRating);

    app.route('/rating/min')
    	.get(getMINRating);

    app.route('/rating/:isbn')
    	.get(getAVRRating);

}

var connection = require('../server').connection;

//API functions

// Grab Books by rating Highest to Lowest
function getMAXRating(request, response) {

	var sql =  'SELECT b.isbn,b.title, avg(r.rating) as average \
				FROM book b, review r \
				where b.isbn = r.isbn GROUP BY b.isbn order by average DESC;'

	 connection.query(sql, function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                response.send('422 Unprocessable Entity');
                return;
            }
            console.log('query SUCCESS!\n')
            response.send(rows);
        });  
}

// Grab Books by rating Lowest to Highest
function getMINRating(request, response) {

	var sql = 'SELECT b.isbn,b.title, avg(r.rating) as average \
				FROM book b, review r \
				where b.isbn = r.isbn GROUP BY b.isbn order by average ASC;'

	 connection.query(sql, function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }
            console.log('query SUCCESS!\n')
            response.send(rows);
        });  
}

// Gets average rating for book given
function getAVRRating(request, response) {
	 
	var isbn = formatVariableForSQL(request.params.isbn);

	var sql = 'select AVG(rating) AS rating from review where isbn = ' + isbn;

	 connection.query(sql, function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }
            console.log('query SUCCESS!\n');
            response.send(rows);
        });  
}

function formatVariableForSQL(oriObj) {
  if (typeof oriObj == 'string') {
    // add single quotation marks around a string
    return '\'' + oriObj + '\''
  }
  // If object is null or number, we want to keep it as is
  return oriObj;
}