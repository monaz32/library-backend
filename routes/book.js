//routes
module.exports = function(app) {  
    app.route('/book')
        .get(getBooks)
        .post(addBook)
        .put(updateBook);

    app.route('/book/:id')
        .get(getBook);
}

var connection = require('../server').connection;

//API functions
function getBooks(request, response) {
    connection.connect(function(error) {
        if(!!error) {
            console.log('Error\n');
            throw error;
        }
        console.log('Connected\n');

        connection.query('SELECT * FROM book', function(error, rows, fields){
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

function addBook(request, response) {
    response.send(request.body.book);
}

function updateBook(request, response) {
    response.send(request.body.book);
}

function getBook(request, response) {
    response.send(request.params.id);
}