//routes
module.exports = function(app) {  
    app.route('/rental/:id')
        .get(getRentals)
        .post(addRental);

    app.route('/rental/return')
        .put(returnRental)
}

var connection = require('../server').connection;
const duplicateSQLCode = 1062;

//API functions

//gets ALL current rentals of a specific id
function getRentals(request, response) {
	console.log('Connected\n');

	var id = request.params.id;

	sql = 'select * from rental where status = 0 and accountID = ' + id;

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

// Add a new rental to a given ID
function addRental(request, response) {

	  var accountid = formatVariableForSQL(request.params.id);
	  var bookid 	= formatVariableForSQL(request.body.bookID);
	  var fromTime 	= formatVariableForSQL(request.body.fromTime);
	  var toTime 	= formatVariableForSQL(request.body.toTime);
	  var fromDate 	= formatVariableForSQL(request.body.fromDate);
	  var toDate 	= formatVariableForSQL(request.body.toDate);

	  var insertTimePeriodQuery = 'INSERT INTO TimePeriod value(' + fromTime + ', ' +
    	toTime + ', ' + fromDate + ', ' + toDate + ')';

    	var timeperiodIsDuplicate = 0;

	  connection.query(insertTimePeriodQuery, function(error, rows, fields) {
	    if(!!error) {
	      if (error.errno == duplicateSQLCode) {
	        // TimePeriod already exists, can proceed to adding row to Schedule.
	        console.log('WARNING: Entry already exists in TimePeriod\n');
	        timeperiodIsDuplicate = 1;
	      }
	      else {
	        console.log('Error in addSchedule query: failed to add to TimePeriod\n');
	        response.send('422 Unprocessable Entity');
	        return;
	      }
	    }
	});

	  var sqlrental ='insert into rental (status,bookid,accountID,fromTime,toTime,fromDate,toDate,returnTime,returnDate)\
	   values (0,' + bookid + ',' + accountid + ',' + fromTime + ',' + toTime + ',' + fromDate + ',' + toDate + ',null,null)' 
	   console.log(sqlrental);

        connection.query(sqlrental, function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }
            console.log('query SUCCESS!\n')
        });  

      var sqlbook = 'update librarybook set status = 0 where bookid = ' + bookid;

      connection.query(sqlbook, function(error, rows, fields){
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


// Change the rental status when book is returned
function returnRental(request, response) {
	
	console.log(request.body);

	var bookid 		= formatVariableForSQL(request.body.bookID);
	var returnTime 	= formatVariableForSQL(request.body.returnTime);
	var returnDate 	= formatVariableForSQL(request.body.returnDate);

	var sqlrental = 'update rental set status = 1, returnTime =  ' + returnTime + ',returnDate = ' + returnDate + 'where status = 0 and bookid = ' + bookid ;

	 connection.query(sqlrental, function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }
            console.log('query SUCCESS!\n')
        });  

	 var sqlbook = 'update librarybook set status = 1 where bookid = ' + bookid;

      connection.query(sqlbook, function(error, rows, fields){
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