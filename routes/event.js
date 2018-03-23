//routes
module.exports = function(app) {  
    app.route('/event')
        .get(getEvents)
        .post(addEvent)
        .put(updateEvent);

    app.route('/event/id/:id')
        .get(getEventId)
        .delete(deleteEvent);

    app.route('/event/location/:location')
        .get(getEventbyLocation);


}

var connection = require('../server').connection;

//API functions
function getEvents(request, response) {
    connection.connect(function(error) {
        if(!!error) {
            console.log('Error\n');
            throw error;
        }
        console.log('Connected\n');

        var query =''

        connection.query('SELECT * FROM ev', function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                throw error;
            }

            console.log('query SUCCESS!\n')
            response.send(rows);
            //connection.end();
        });
    });
}


function postAPI(request, response) {

}

function putAPI(request, response) {
	
}