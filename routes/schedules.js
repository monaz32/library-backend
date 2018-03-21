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
  //response.send(request.body.book);
}

function updateSchedule(request, response) {
  //response.send(request.body.book);
}

function getBook(request, response) {
  //response.send(request.params.id);
}