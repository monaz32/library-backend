//routes
module.exports = function(app) {  
    app.route('/member')
    	.get(getMembers)
    	.post(addMember);

    app.route('/member/id/:id')
    	.get(getMember)
    	.put(updateMember);
}

var connection = require('../server').connection;

// Gets ALL Members
function getMembers(request, response) {
        console.log('Connected\n');

        connection.query('SELECT accountID,phoneNum,email,name,fines FROM members', function(error, rows, fields){
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

// Gets Member based on account.id given
function getMember(request, response) {
        console.log('Connected\n');

        var id = request.params.id

        connection.query('SELECT accountID,phoneNum,email,name,fines FROM members where members.accountid =' + id, function(error, rows, fields){
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


// Adds a new member to the database
function addMember(request, response) {
	
	  console.log('Connected\n');

	  console.log(request.body);

	  var phoneNum 	= request.body.phoneNum;
	  var email 	= request.body.email;
	  var name	 	= request.body.name;
      var password  = formatVariableForSQL(request.body.password);

	  var sql ='insert into members (phoneNum,email,name,fines,password) values (';

	  sql = sql + '\'' + phoneNum + '\''  + ',' + '\'' + email + '\'' + ',' + '\'' + name + '\'' + ',0,' + password + ');';  

        connection.query(sql, function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }

            console.log('query SUCCESS!\n');
            response.send();
        });
        
}


// Changes information based on account.id given
function updateMember(request, response) {
	console.log('Connected\n');

	var phoneNum       = formatVariableForSQL(request.body.phoneNum);
	var fines          = formatVariableForSQL(request.body.fines);
	var id             = formatVariableForSQL(request.params.id);
    var password       = formatVariableForSQL(request.body.password);

	  var sql ='update members set phoneNum = ' + phoneNum ;

	  sql = sql + ', fines = ' + fines; 
      sql = sql + ', password = ' + password;
	  sql = sql + ' where accountid = ' + id ;

        connection.query(sql, function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }

            console.log('query SUCCESS!\n')
            response.send();
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