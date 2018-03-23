//routes
//routes
module.exports = function(app) {
    app.route('/employee')
        .get(getEmployees)
        .post(addEmployee);


    app.route('/employee/id/:id')
        .get(getEmployee)
        .put(updateEmployee)
        .delete(deleteEmployee);

    app.route('/employee/name/:name')
        .get(getEmployeeName);



}

var connection = require('../server').connection;

//API functions
function getEmployees(request, response) {
    connection.connect(function(error) {
        if(!!error) {
            console.log('Error\n');
            throw error;
        }
        console.log('Connected\n');

        connection.query('SELECT * FROM employee', function(error, rows, fields){
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

function addEmployee(request, response) {
    console.log(request.body);
    var employ = request.body[0];
    var email = employ.email;
    var sin = employ.sin;
    var name = employ.name;
    var address = employ.address;
    var phoneNum = employ.phoneNum;
    var branch = employ.branch;
    var admin = employ.admin;


    var query = 'INSERT INTO employee(eEmail,SIN,ename,eAddress,ePhoneNumber,branchNum,admin) '+ 'VALUES' +'(' + '\'' + email + '\',' + '\'' + sin + '\',' +
        '\'' + name + '\',' + '\'' + address + '\',' + '\'' + phoneNum + '\',' + '\'' + branch + '\'' + admin + ');'

    console.log(query);

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');
            throw error;
        }

        console.log('query SUCCESS!\n');
        response.send(rows);
        //connection.end();
    });
}

function updateEmployee(request, response) {
    response.send(request.body.employee);
}

function getEmployee(request, response) {

    var eid = request.params.id;
    connection.query('SELECT * FROM employee WHERE eid=' + String(eid) +';', function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');
            throw error;
        }

        console.log('query SUCCESS!\n');
        response.send(rows);
        //connection.end();
    });

}

function getEmployeeName(request, response) {

    var name = request.params.name;
    var query = "SELECT * FROM employee WHERE ename LIKE " + "'%" + String(name) +"%';";
    //console.log(query);
    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');
            throw error;
        }

        console.log('query SUCCESS!\n');
        response.send(rows);
        //connection.end();
    });

}


function deleteEmployee(request, response) {
    var eid = request.params.id;

    var query = "DELETE FROM employee WHERE eid="  + eid + ";"
    //should we do a  select * after ?
    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');
            throw error;
        }

        console.log('query SUCCESS!\n');
        response.send(rows);
        //connection.end();
    });
}

