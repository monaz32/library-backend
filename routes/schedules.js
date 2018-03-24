module.exports = function(app) {
  app.route('/schedules')
    .get(getSchedules)
    .post(addSchedule);

  app.route('/schedules/:accid')
    .get(getScheduleWithAccountID);

  app.route('/schedules/:roomname')
    .get(getScheduleWithRoomName);
}

var connection = require('../server').connection;
const duplicateSQLCode = 1062;

/////////////////// schedules ///////////////////
// Returns all schedules
function getSchedules(request, response) {
  connection.query('SELECT * FROM schedules', function(error, rows, fields){
    if(!!error) {
      console.log('Error in getSchedules query: failed to get all schedules\n');
      logErrorToConsole(error);
      response.status(422).send('422 Unprocessable Entity');
    }
    else {
      console.log('getSchedules query SUCCESS\n')
      response.send(rows);
    }
  });
}

// Add a single schedule
function addSchedule(request, response) {
  var fromTime = formatVariableForSQL(request.body.fromTime);
  var fromDate = formatVariableForSQL(request.body.fromDate);
  var toTime = formatVariableForSQL(request.body.toTime);
  var toDate = formatVariableForSQL(request.body.toDate);

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
        logErrorToConsole(error);
        response.status(422).send('422 Unprocessable Entity');
        return;
      }
    }

    var id = formatVariableForSQL(request.body.accountID);
    var roomName = formatVariableForSQL(request.body.roomName);

    var insertScheduleQuery = 'INSERT INTO schedules value(' + id + ', ' + roomName + ', ' +
      fromTime + ', ' + toTime + ', ' + fromDate + ', ' + toDate + ')';

    connection.query(insertScheduleQuery, function(error, row, fields) {
      if(!!error) {
        console.log('Error in addSchedule query: failed to add to Schedules\n');
        logErrorToConsole(error);

        if (!timeperiodIsDuplicate) {
          // We added the time period to the TimePeriod table, so we need to delete it
          // from the TimePeriod table.
          var deleteTimePeriod = 'DELETE FROM TimePeriod where fromTime = ' + fromTime + ' and toTime = ' +
            toTime + ' and fromDate = ' + fromDate + ' and toDate = ' + toDate;

          connection.query(deleteTimePeriod, function(error, row, fields) {
            if (!!error) {
              console.log('Error in addSchedule query: failed to delete from TimePeriod\n');
              logErrorToConsole(error);
            }
          });
        }
        response.status(422).send('422 Unprocessable Entity');
      }
      else {
        console.log('addSchedule query SUCCESS: added to Schedules\n');
        response.send();
      }
    });
  });
}


/////////////////// schedules/:accid ///////////////////
// Return schedules booked by user with accid
function getScheduleWithAccountID(request, response) {
  connection.connect(function(error) {
    // todo
    response.status(200).send("not implemented yet");
  });
}


/////////////////// schedules/:roomname ///////////////////
function getScheduleWithRoomName(request, response) {
  connection.connect(function(error) {
    // todo
    response.status(200).send("not implemented yet");
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