//routes
module.exports = function(app) {  
    app.route('/event')
        .get(getEvents)
        .post(addEvent)
        .put(updateEvent)
        .get(getEventsCurrent)
        .get(getEventsPast);

    app.route('/event/id/:id')
        .get(getEventId)
        .delete(deleteEvent);

    app.route('/event/location/:location')
        .get(getEventByLocation);


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


        connection.query('SELECT * FROM event ORDER BY STR_TO_DATE(fromDate, \'%m/%d/%Y\');', function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }

            console.log('query SUCCESS!\n')
            response.send(rows);
            //connection.end();
        });
    });
}

function getEventsCurrent(request, response) {
    connection.connect(function(error) {
        if(!!error) {
            console.log('Error\n');
            throw error;
        }
        console.log('Connected\n');

        connection.query('SELECT * FROM event WHERE CURDATE() <= STR_TO_DATE(toDate, \'%m/%d/%Y\') ' +
            'ORDER BY STR_TO_DATE(fromDate, \'%m/%d/%Y\');', function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }

            console.log('query SUCCESS!\n')
            response.send(rows);
            //connection.end();
        });
    });
}

function getEventsPast(request, response) {
    connection.connect(function(error) {
        if(!!error) {
            console.log('Error\n');
            throw error;
        }
        console.log('Connected\n');

        connection.query('SELECT * FROM event WHERE CURDATE() > STR_TO_DATE(toDate, \'%m/%d/%Y\') ' +
            'ORDER BY STR_TO_DATE(fromDate, \'%m/%d/%Y\');', function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }

            console.log('query SUCCESS!\n')
            response.send(rows);
            //connection.end();
        });
    });
}

function getEventId(request, response) {
    connection.connect(function(error) {
        if(!!error) {
            console.log('Error\n');
            throw error;
        }
        console.log('Connected\n');

        var id = request.params.id;

        connection.query('SELECT * FROM event WHERE CURDATE() > STR_TO_DATE(toDate, \'%m/%d/%Y\') ' +
            'ORDER BY STR_TO_DATE(fromDate, \'%m/%d/%Y\');', function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }

            console.log('query SUCCESS!\n')
            response.send(rows);
            //connection.end();
        });
    });
}


function getEventByLocation(request, response) {
    connection.connect(function(error) {
        if(!!error) {
            console.log('Error\n');
            throw error;
        }
        console.log('Connected\n');
        var location = request.params.location;

        var query = "SELECT librarybranch.name, phoneNum, address, event.name, fromTime, toTime, fromDate, toDate " +
            "FROM event INNER JOIN librarybranch ON event.branchNum = librarybranch.branchNum" +
            "WHERE librarybranch.name=" + "\'" + location + "\'" +  " ORDER BY STR_TO_DATE(fromDate, '%m/%d/%Y');"

        connection.query(query, function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
            }

            console.log('query SUCCESS!\n')
            response.send(rows);
            //connection.end();
        });
    });
}


function addEvent(request, response) {
    connection.connect(function(error) {
        if(!!error) {
            console.log('Error\n');
            throw error;
        }
        console.log('Connected\n');

        var event = request.body[0];
        var name = event.name;
        var branchNum = event.branchNum;
        var fromTime = event.fromTime;
        var toTime = event.toTime;
        var fromDate = event.fromDate;
        var toDate = event.toDate;

        var query1 = 'INSERT INTO timeperiod' + 'VALUES'+'(' + '\'' + fromTime + '\',' + '\'' + toTime + '\',' +
            '\'' + fromDate + '\',' + '\'' + toDate + '\'' + ');'

        connection.query(query1, function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }

            console.log('query SUCCESS!\n')
            response.send(rows);
            //connection.end();
        });

        var query2 = 'INSERT INTO event(name,branchNum,fromTime,fromDate,toTime,toDate) '+ 'VALUES' +'(' + '\'' + name + '\',' + '\'' + branchNum + '\',' +
            '\'' + fromTime + '\',' + '\'' + fromDate + '\',' + '\'' + toTime + '\',' + '\'' + toDate + '\'' + ');'
        connection.query(query2, function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }

            console.log('query SUCCESS!\n')
            response.status(200).send();
            //connection.end();
        });
    });


}

function deleteEvent(request, response) {
    var eventid = request.params.id;

    var query = "DELETE FROM event WHERE eventid="  + eventid + ";"
    //should we do a  select * after ?
    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');
            response.status(422);
            response.send('422 Unprocessable Entity');
            return;
        }

        console.log('query SUCCESS!\n');
        response.send();
        //connection.end();
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
