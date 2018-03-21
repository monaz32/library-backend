//routes
module.exports = function(app) {
  app.route('/schedules')
    .get(getSchedules)
    .post(addSchedule)
    .put(updateSchedule);

  app.route('/schedules/:id')
    .get(getBook);
}

var connection = require('../server').connection;

//API functions
function getSchedules(request, response) {
  connection.connect(function(error) {
    console.log('Connected to database\n');

    connection.query('SELECT * FROM schedules', function(error, rows, fields){
      if(!!error) {
        console.log('Error in getSchedules query\n');
        throw error;
      }

      console.log('getSchedules query SUCCESS!\n')
      response.send(rows);
    });
  });
}

function addSchedule(request, response) {
  connection.connect(function(error) {
    console.log('Connected to database\n');

    var fromTime;
    var fromDate;
    var toTime;
    var toDate;

    var insertTimePeriod = 'INSERT INTO TimePeriod value(\'' + fromTime + '\', \'' +
      toTime + '\', \'' + fromDate + '\', \'' + toDate + '\')';

    connection.query(insertTimePeriod, function(error, rows, fields){
      if(!!error) {
        console.log('Error in addSchedule query: failed to add to TimePeriod\n');
        throw error;
      }
      console.log('addSchedule query SUCCESS: added to TimePeriod\n')

      var id; // should be num
      var roomName;

      var insertSchedule = 'INSERT INTO schedules value(' + id + ', \'' + roomName + '\', \'' +
        fromTime + '\', \'' + toTime + '\', \'' + fromDate + '\', \'' + toDate + '\')';

      connection.query(insertSchedule, function(error, row, fields) {
        if(!!error) {
          console.log('Error in addSchedule query: failed to add to Schedules\n');
          throw error;
        }

        console.log('addSchedule query SUCCESS: added to Schedules\n')
      })
    });
  });
}

function updateSchedule(request, response) {
  //response.send(request.body.book);
}

function getBook(request, response) {
  //response.send(request.params.id);
}