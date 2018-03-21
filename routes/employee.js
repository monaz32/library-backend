//routes
module.exports = function(app) {
    app.route('/employee')
        .get(getEmployee)
        .post(addEmployee)
        .put(updateEmployee)
        .delete(deleteEmployee);

    app.route('/employee/:id')
        .get(getEmployee);

    app.route('/employee/:id')
        .post(addEmployee);

    app.route('/employee/:id')
        .put(updateEmployee);

    app.route('/employee/:id')
        .delete(deleteEmployee);

    app.route('employee/:id/:name')


}

var connection = require('../server').connection;

//API functions
function getEmployee(request, response) {
    connection.connect(function(error) {
        if(!!error) {
            console.log('Error\n');
            throw error;
        }
        console.log('Connected\n');

        connection.query('SELECT * FROM Employee', function(error, rows, fields){
            if(!!error) {
                console.log('Error in the query\n');
                throw error;
            }

            console.log('query SUCCESS!\n')
            response.send(rows);
            connection.end();
        });
    });
}

//API functions
function getEmployee(request, response) {
    response.send(request.params.id);
}

function updateEmployee(request, response) {
    response.send(request.body.employee);
}

function addEmployee(request, response) {
    response.send(request.body.employee);
}

function deleteEmployee(request, response) {
    response.send(request.body.employee);
}