module.exports = function(app) {
  app.route('/branches')
    .get(getBranches)
    .post(addBranch);

  app.route('/branches/:bid')
    .get(getBranchWithID);

  app.route('/branches/:bid/rooms')
    .get(getRoomsAtBranch)
    .post(addRoomToBranch);

  app.route('branches/:bid/rooms/:rid')
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

function addBranch(request, response) {
  response.status(404).send("needs to be implemented");
}


/////////////////// branches/:bid ///////////////////

function getBranchWithID(request, response) {
  response.status(404).send("needs to be implemented");
}


/////////////////// /branches/:bid/rooms ///////////////////

function getRoomsAtBranch(request, response) {
  response.status(404).send("needs to be implemented");
}

function addRoomToBranch(request, response) {
  response.status(404).send("needs to be implemented");
}


/////////////////// /branches/:bid/rooms ///////////////////
function getRoomWithIDAtBranch(request, response) {
  response.status(404).send("needs to be implemented");
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