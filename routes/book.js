//routes
module.exports = function(app) {
    app.route('/book')
        .post(addBook)
        .put(updateBook);

    app.route('/book/filter')
        .post(getBooks);

    app.route('/book/:isbn')
        .get(getBook)
        .delete(deleteBook);
}

var connection = require('../server').connection;

//API functions
function getBooks(request, response) {
    var title = request.body.title;
    var author = request.body.author;
    var publisher = request.body.publisher;
    var genre = request.body.genre; 
    var query = 'SELECT * FROM Book';

    if(title || author || publisher || genre) {
        query += ' WHERE ';
        
        if(title) {
            titleFilter = 'title = ' +title +'",';
            query += titleFilter;
        }

        else if(author) {
            authorFilter = 'author = "' +author +'",';
            query += authorFilter;
        }

        else if(publisher) {
            publisherFilter = 'publisher = "' +publisher +'",';
            query += publisherFilter;
        }

        else if(genre) {
            genreFilter = 'genre = "' +genre +'"';
            query += genreFilter;
        }

        if(query[query.length - 1] == ',') {
            query = query.substring(0, query.length-1);
        }
    }
    
    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');
            response.status(422);
            response.send('422 Unprocessable Entity');
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
        }

        console.log('query SUCCESS!\n')
        response.send(rows);
    });
}

function updateBook(request, response) {
    var isbn = request.body.isbn;
    var title = request.body.title;
    var author = request.body.author;
    var publisher = request.body.publisher;
    var genre = request.body.genre; 
    var query = 'UPDATE Book \
    Set title="' +title +'", author="' +author +'",\
    publisher="' + publisher +'", genre="' +genre +'" \
    WHERE isbn = "' +isbn +'"';

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');

            response.status(422);
            response.send('422 Unprocessable Entity');
        }

        console.log('query SUCCESS!\n')
        response.send(rows);
    });
}

function getBook(request, response) {
    var isbn = request.params.isbn;
    var query = 'SELECT * FROM Book \
    WHERE isbn="' +isbn +'"';

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');

            response.status(422);
            response.send('422 Unprocessable Entity');
        }

        console.log('query SUCCESS!\n')
        response.send(rows);
    });
}

function deleteBook(request, response) {
    var isbn = request.params.isbn;
    var query = 'DELETE * FROM Book \
    WHERE isbn="' +isbn +'"';

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');

            response.status(422);
            response.send('422 Unprocessable Entity');
        }

        console.log('query SUCCESS!\n')
        response.send();
    });
}