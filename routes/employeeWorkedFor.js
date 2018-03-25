module.exports = function(app) {
    app.route('/employeeWorkedFor')
        .get(getEmployeesWorkedFor);

    app.route('/employeeWorkedFor/id/:id')
        .get(getEmployeeWorkedFor);

}

var connection = require('../server').connection;
const duplicateSQLCode = 1062;

//API functions
function getEmployeesWorkedFor(request, response) {


        var query = 'SELECT  employee.eid, employee.ename, employeeworkedfor.branchNum, fromDate, toDate' +
            ' FROM employee' +
            ' INNER JOIN employeeworkedfor ON employee.eid = employeeworkedfor.eid;'

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

function getEmployeeWorkedFor(request, response) {

    var id = request.params.id;
    var query = 'SELECT  employee.eid, employee.ename, employeeworkedfor.branchNum, fromDate, toDate' +
        ' FROM employee' +
        ' INNER JOIN employeeworkedfor ON employee.eid = employeeworkedfor.eid' +
        ' WHERE employee.eid=' + id + ';'

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