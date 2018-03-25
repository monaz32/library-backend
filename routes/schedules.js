module.exports = function(app) {
  app.route('/schedules')
    .get(getSchedules)
    .post(addSchedule);

  app.route('/schedules/accids/:accid')
    .get(getSchedulesWithAccountID);

  app.route('/schedules/rooms/:roomname')
    .get(getSchedulesWithRoomName);
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
function getSchedulesWithAccountID(request, response) {
  connection.connect(function(error) {
    var accid = formatVariableForSQL(request.params.accid);
    var getSchedulesQuery = 'SELECT * FROM schedules where accountID = ' + accid;

    connection.query(getSchedulesQuery, function(error, row, fields) {
      if (!!error) {
        console.log('Error in getSchedulesWithAccountID query: failed to select from schedules\n');
        logErrorToConsole(error);
        response.status(422).send('422 Unprocessable Entity');
      }
      else {
        console.log('getSchedulesWithAccountID query SUCCESSS: sending rows back to client\n');
        response.send(row);
      }
    });
  });
}


/////////////////// schedules/:roomname ///////////////////
function getSchedulesWithRoomName(request, response) {
  connection.connect(function(error) {
    var roomname = formatVariableForSQL(request.params.roomname);
    var getSchedulesQuery = 'SELECT * FROM schedules where roomName = ' + roomname;

    connection.query(getSchedulesQuery, function(error, row, fields) {
      if (!!error) {
        console.log('Error in getSchedulesWithRoomName query: failed to select from schedules\n');
        logErrorToConsole(error);
        response.status(422).send('422 Unprocessable Entity');
      }
      else {
        console.log('getSchedulesWithRoomName query SUCCESSS: sending rows back to client\n');
        response.send(row);
      }
    });
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