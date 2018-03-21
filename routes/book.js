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
    connection.query('SELECT * FROM book', function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');
            throw error;
        }

        console.log('query SUCCESS!\n')
        response.send(rows);
    });
}

function addBook(request, response) {
    var isbn = request.body.isbn;
    var title = request.body.title;
    var author = request.body.author;
    var publisher = request.body.publisher;
    var genre = request.body.genre; 
    var query = 'INSERT INTO Book (isbn, title, author, publisher, genre) \
    Values ("' +isbn +'", "' +title +'", "' +author +'", "' +publisher +'", "' +genre +'")';

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');

            response.status(422);
            response.send('422 Unprocessable Entity');
            throw error;
        }

        console.log('query SUCCESS!\n')
        response.send(rows);
    });
}

function updateBook(request, response) {
    response.send(request.body.book);
}

function getBook(request, response) {
    response.send(request.params.id);
}