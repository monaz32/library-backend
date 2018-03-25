//routes
module.exports = function(app) {  
    app.route('/event')
        .get(getEvents)
        .post(addEvent);

    app.route('/event/current')
        .get(getEventsCurrent);

    app.route('/event/past')
        .get(getEventsPast);

    app.route('/event/id/:id')
        .get(getEventId)
        .put(updateEvent)
        .delete(deleteEvent);

    app.route('/event/location')
        .get(getEventLocations);

    app.route('/event/location/:location')
        .get(getEventByLocation);
}

var connection = require('../server').connection;
const duplicateSQLCode = 1062;

//API functions


function getEvents(request, response) {
        connection.query('SELECT * FROM event ORDER BY STR_TO_DATE(fromDate, \'%m/%d/%Y\'), STR_TO_DATE(fromTime, \'%H:%i\');', function(error, rows, fields){
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
}

function getEventsCurrent(request, response) {

        connection.query('SELECT * FROM event WHERE CURDATE() <= STR_TO_DATE(toDate, \'%m/%d/%Y\') ' +
            'ORDER BY STR_TO_DATE(fromDate, \'%m/%d/%Y\'), STR_TO_DATE(fromTime, \'%H:%i\');', function(error, rows, fields){
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
}

function getEventsPast(request, response) {
        connection.query('SELECT * FROM event WHERE CURDATE() > STR_TO_DATE(toDate, \'%m/%d/%Y\') ' +
            'ORDER BY STR_TO_DATE(fromDate, \'%m/%d/%Y\'), STR_TO_DATE(fromTime, \'%H:%i\');', function(error, rows, fields){
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
}

function getEventId(request, response) {

        var id = request.params.id;

        connection.query('SELECT * FROM event WHERE CURDATE() > STR_TO_DATE(toDate, \'%m/%d/%Y\') ' +
            'ORDER BY STR_TO_DATE(fromDate, \'%m/%d/%Y\'), STR_TO_DATE(fromTime, \'%H:%i\');', function(error, rows, fields){
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
}

function getEventLocations(request, response) {
    var location = formatVariableForSQL(request.params.location);

    var query = "SELECT librarybranch.name, phoneNum, address, event.name, fromTime, toTime, fromDate, toDate " +
        "FROM event INNER JOIN librarybranch ON event.branchNum = librarybranch.branchNum " +
        "ORDER BY STR_TO_DATE(fromDate, '%m/%d/%Y'), STR_TO_DATE(fromTime, '%H:%i');"

    console.log(query)
    connection.query(query, function(error, rows, fields){
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
}


function getEventByLocation(request, response) {
        var location = formatVariableForSQL(request.params.location);

        var query = "SELECT librarybranch.name, phoneNum, address, event.name, fromTime, toTime, fromDate, toDate " +
            "FROM event INNER JOIN librarybranch ON event.branchNum = librarybranch.branchNum " +
            "WHERE librarybranch.name=" + location +  " ORDER BY STR_TO_DATE(fromDate, '%m/%d/%Y'), STR_TO_DATE(fromTime, '%H:%i');"

        console.log(query)
        connection.query(query, function(error, rows, fields){
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
}


function addEvent(request, response) {

    var event = request.body;
    var name = formatVariableForSQL(event.name);
    var branchNum = formatVariableForSQL(event.branchNum);
    var fromTime = formatVariableForSQL(event.fromTime);
    var toTime = formatVariableForSQL(event.toTime);
    var fromDate = formatVariableForSQL(event.fromDate);
    var toDate = formatVariableForSQL(event.toDate);

    var query1 = 'INSERT INTO timeperiod VALUES' + '(' + fromTime + ',' + toTime + ',' +
        fromDate + ',' + toDate + ');'

    var timeperiodIsDuplicate = 0;

    connection.query(query1, function (error, rows, fields) {
        if (!!error) {
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

        var query2 = 'INSERT INTO event(name,branchNum,fromTime,fromDate,toTime,toDate) ' + 'VALUES' + '('  + name + ',' + branchNum + ',' +
            fromTime + ',' + fromDate + ',' + toTime + ',' + toDate + ');'


        connection.query(query2, function (error, rows, fields) {
            if (!!error) {
                console.log('Error in addSchedule query: failed to add to Event\n');
                logErrorToConsole(error);

                if (!timeperiodIsDuplicate) {
                    // We added the time period to the TimePeriod table, so we need to delete it
                    // from the TimePeriod table.
                    var deleteTimePeriod = 'DELETE FROM TimePeriod where fromTime = ' + fromTime + ' and toTime = ' +
                        toTime + ' and fromDate = ' + fromDate + ' and toDate = ' + toDate;

                    connection.query(deleteTimePeriod, function (error, row, fields) {
                        if (!!error) {
                            console.log('Error in addEvent query: failed to delete from TimePeriod\n');
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

        console.log('Event successfully deleted!\n');
        response.send();
        //connection.end();
    });
	
}


function updateEvent(request, response) {
    var id = request.params.id;
    var event = request.body;
    var name = formatVariableForSQL(event.name);
    var branchNum = formatVariableForSQL(event.branchNum);
    var fromTime = formatVariableForSQL(event.fromTime);
    var toTime = formatVariableForSQL(event.toTime);
    var fromDate = formatVariableForSQL(event.fromDate);
    var toDate = formatVariableForSQL(event.toDate);

    var query = 'UPDATE event SET name=' + name + ", branchNum=" + branchNum + ", fromTime=" + fromTime +
        ", toTime=" + toTime + ", fromDate=" + fromDate + ", toDate=" + toDate +
        " WHERE eventid=" + id + ";"

    console.log(query);

    connection.query(query, function(error, rows, fields) {
        if (!!error) {
            console.log('Error in the query\n');
            response.status(422);
            response.send('422 Unprocessable Entity');
            return;
        }

        console.log('Event successfully updated!\n');
        response.status(200).send();
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

function logErrorToConsole(error) {
    console.log(error.code + ': ' + error.sqlMessage + '\n');
}