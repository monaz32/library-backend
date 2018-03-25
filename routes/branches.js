module.exports = function(app) {
  app.route('/branches')
    .get(getBranches);

  app.route('/branches/:bid')
    .get(getBranchWithID);

  app.route('/branches/:bid/rooms')
    .get(getRoomsAtBranch);

  app.route('/branches/:bid/rooms/:rid')
    .get(getRoomWithIDAtBranch);
}

var connection = require('../server').connection;

/////////////////// branches ///////////////////

// Returns details on all branches
function getBranches(request, response) {
  connection.query('SELECT * FROM LibraryBranch', function(error, rows, fields){
    if(!!error) {
      console.log('Error in getBranches query: failed to get all branches\n');
      logErrorToConsole(error);
      response.status(422).send('422 Unprocessable Entity');
    }
    else {
      console.log('getBranches query SUCCESS\n')
      response.send(rows);
    }
  });
}

/////////////////// branches/:bid ///////////////////

// Returns details on a specific branch with ID bid
function getBranchWithID(request, response) {
  var getBranchQuery = 'SELECT * FROM LibraryBranch where branchNum = ' + formatVariableForSQL(request.params.bid);

  connection.query(getBranchQuery, function(error, rows, fields){
    if(!!error) {
      console.log('Error in getBranchWithID query: failed to get all branches\n');
      logErrorToConsole(error);
      response.status(422).send('422 Unprocessable Entity');
    }
    else {
      console.log('getBranchWithID query SUCCESS\n')
      response.send(rows);
    }
  });
}


/////////////////// /branches/:bid/rooms ///////////////////

// Returns details on all rooms at a specific branch with ID bid
function getRoomsAtBranch(request, response) {
  var getRoomsQuery = 'SELECT * FROM Room where branchNum = ' + formatVariableForSQL(request.params.bid);

  connection.query(getRoomsQuery, function(error, rows, fields){
    if(!!error) {
      console.log('Error in getRoomsAtBranch query: failed to get all branches\n');
      logErrorToConsole(error);
      response.status(422).send('422 Unprocessable Entity');
    }
    else {
      console.log('getRoomsAtBranch query SUCCESS\n')
      response.send(rows);
    }
  });
}


/////////////////// /branches/:bid/rooms ///////////////////

// Returns details on the room with number rid at the branch with ID bid
function getRoomWithIDAtBranch(request, response) {
  var getRoomQuery = 'SELECT * FROM Room where branchNum = ' + formatVariableForSQL(request.params.bid) +
    'and roomNumber = ' + formatVariableForSQL(request.params.rid);

  connection.query(getRoomQuery, function(error, rows, fields){
    if(!!error) {
      console.log('Error in getRoomWithIDAtBranch query: failed to get all branches\n');
      logErrorToConsole(error);
      response.status(422).send('422 Unprocessable Entity');
    }
    else {
      console.log('getRoomWithIDAtBranch query SUCCESS\n')
      response.send(rows);
    }
  });
}


/////////////////// Utilities ///////////////////
function logErrorToConsole(error) {
  console.log(error.code + ': ' + error.sqlMessage + '\n');
}

function formatVariableForSQL(oriObj) {
  if (typeof oriObj == 'string') {
    // add single quotation marks around a string
    return '\'' + oriObj + '\''
  }
  // If object is null or number, we want to keep it as is when passing in to the query.
  return oriObj;
}