
//routes
module.exports = function(app) {
    app.route('/employee')
        .get(getEmployees)
        .post(addEmployee);

    app.route('/employee/id/:id')
        .get(getEmployee)
        .put(updateEmployee);

    app.route('/employee/name/:name')
        .get(getEmployeeName);

    app.route('/employee/login')
        .post(employeeLogin);

}

var connection = require('../server').connection;
const duplicateSQLCode = 1062;

//API functions
function getEmployees(request, response) {

        connection.query('SELECT eid, eEmail, sin, ename, eaddress, ephonenumber, branchnum, adminStatus FROM employee;', function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }

            console.log('Successfully retreived all employees!\n')
            response.send(rows);
            //connection.end();
        });
}

function addEmployee(request, response) {

    var employ = request.body;
    var email = employ.email;
    var sin = employ.sin;
    var name = employ.name;
    var address = employ.address;
    var phoneNum = employ.phoneNum;
    var branch = employ.branch;
    var admin = employ.admin;
    var password = formatVariableForSQL(employ.password);

    var eid;

    var getAutoincrementQuery = 'SELECT `AUTO_INCREMENT` ' +
        'FROM  INFORMATION_SCHEMA.TABLES ' +
        'WHERE TABLE_SCHEMA = \'library\' ' +
        'AND   TABLE_NAME   = \'employee\';'

    connection.query(getAutoincrementQuery, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');
            response.status(422);
            response.send('422 Unprocessable Entity');
            return;
        }

        var numbers = JSON.stringify(rows[0]).match(/\d+/g).map(Number);
        eid = numbers[0];
        var query = 'INSERT INTO employee(eEmail,SIN,ename,eAddress,ePhoneNumber,branchNum, adminStatus, password) '+ 'VALUES' +'(' + '\'' + email + '\',' + '\'' + sin + '\',' +
            '\'' + name + '\',' + '\'' + address + '\',' + '\'' + phoneNum + '\',' + branch + ',' + admin + ',' + password + ');'

            console.log(query);

        connection.query(query, function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query insert employee\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }            
            console.log('Successfully added employee!\n');
            response.send(rows);
        });

    });

}

function updateEmployee(request, response) {

        var eid = request.params.id;
        var employ = request.body;
        var address = formatVariableForSQL(employ.address);
        var phoneNum = formatVariableForSQL(employ.phoneNum);

        var query = "UPDATE employee SET  eAddress=" + address + ", ePhoneNumber=" + phoneNum +
            " WHERE eid=" + eid + ";"

        connection.query(query, function(error, rows, fields) {
            if (!!error) {
                console.log('Error in the query\n');
                response.status(422);
                response.send('422 Unprocessable Entity');
                return;
            }

            console.log('Successfully updated Employee!\n');
            response.status(200).send(rows);
            //connection.end();

        });
}


function getEmployee(request, response) {

    var eid = request.params.id;
    connection.query('SELECT eid, eEmail, sin, ename, eaddress, ephonenumber, branchnum, adminStatus FROM employee WHERE eid=' + String(eid) +';', function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');
            response.status(422);
            response.send('422 Unprocessable Entity');
            return;
        }

        console.log('Successfully retrieved employee!\n');
        response.send(rows);
        //connection.end();
    });

}

function getEmployeeName(request, response) {

    var name = request.params.name;
    var query = "SELECT eid, eEmail, sin, ename, eaddress, ephonenumber, branchnum, adminStatus FROM employee WHERE ename LIKE " + "'%" + String(name) +"%';";

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');
            response.status(422);
            response.send('422 Unprocessable Entity');
            return;
        }

        console.log('Successfully retrieved employee!\n');
        response.send(rows);
    });

}

function employeeLogin(request, response){
    var employ = request.body;
    var email = formatVariableForSQL(employ.email);
    var password = formatVariableForSQL(employ.password);

    var query = 'SELECT EXISTS(SELECT 1 FROM employee WHERE eEmail=' + email + ' AND ' + 'password=' + password + ');'
    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');
            response.status(422);
            response.send('422 Unprocessable Entity');
            return;
        }

        var split = JSON.stringify(rows[0]).split(':',2)[1];
        var numbers = split.match(/\d+/g).map(Number);
        var exists = numbers[0];
        //console.log(exists);

        if (exists){
            connection.query('SELECT eid FROM employee WHERE eEmail=' + email + ';', function(error, rows, fields) {
                if (!!error) {
                    console.log('Error in the query\n');
                    response.status(422);
                    response.send('422 Unprocessable Entity');
                    return;
                }
                console.log('Successful login!\n');
                response.send(rows);
            });
        } else {
            console.log("Invalid email or password\n");
            response.status(422);
            response.send('422 Unprocessable Entity');
        }
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
