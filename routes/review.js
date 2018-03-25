//routes
module.exports = function(app) {  
    app.route('/review/:isbn')
        .get(getReviews)
        .post(makeReview);

 }

var connection = require('../server').connection;

//API functions

//Gets all reviews for a book based off a ISBN
function getReviews(request, response) {
	console.log('Connected\n');

	var isbn = formatVariableForSQL(request.params.isbn);

	var sql = 	'select b.title, r.rating,r. review, m.name \
				from review r, book b, members m \
	 			where b.isbn = ' + isbn + ' and r.isbn = ' + isbn + ' and r.accountID = m.accountID'

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

function makeReview(request, response) {

  var isbn      = formatVariableForSQL(request.params.isbn);
  var accountID = formatVariableForSQL(request.body.accountID);
  var rating    = formatVariableForSQL(request.body.rating);
  var review    = formatVariableForSQL(request.body.review);

  var sql       = 'insert into review (accountID,isbn,rating,review) \
                  values (' + accountID + ',' + isbn + ',' + rating + ',' + review + ')';

  console.log(sql);  

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

function formatVariableForSQL(oriObj) {
  if (typeof oriObj == 'string') {
    // add single quotation marks around a string
    return '\'' + oriObj + '\''
  }
  // If object is null or number, we want to keep it as is
  return oriObj;
}