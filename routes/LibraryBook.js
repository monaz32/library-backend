//routes
module.exports = function(app) {  
    app.route('/librarybook')
        .post(addLibraryBook)
        .put(updateLibraryBook);

    app.route('/librarybook/filter')
        .post(getLibraryBooks);

    app.route('/librarybook/count')
        .get(getLibraryBookCount);

    app.route('/librarybook/:bookID')
        .get(getLibraryBook)
        .delete(deleteLibraryBook);

}

var connection = require('../server').connection;

function getLibraryBooks(request, response) {
    var isbn = request.body.isbn;
    var query = 'SELECT * FROM LibraryBook WHERE isbn = ' +'"' +isbn +'"';

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');
            response.status(422);
            response.send('422 Unprocessable Entity');
        }
        else {
          console.log('query SUCCESS!\n')
          response.send(rows);
        }
    });
}

function addLibraryBook(request, response) {
    var isbn = request.body.isbn;
    var branchNum = request.body.branchNum;
    var query = 'INSERT INTO LibraryBook (isbn, branchNum, status) \
    Values ("' +isbn +'", "' +branchNum +'", "1")';

    console.log(query);

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');

            response.status(422);
            response.send('422 Unprocessable Entity');
        }
        else {
          console.log('query SUCCESS!\n')
          response.send(rows);
        }
    });
}

function updateLibraryBook(request, response) {
    var bookID = request.body.bookid;
    var branchNum = request.body.branchNum;
    var status = request.body.status;

    var query = 'UPDATE LibraryBook \
    Set branchNum="' +branchNum +'",\
    status="' +status +'" \
    WHERE bookid = "' +bookID +'"';

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');

            response.status(422);
            response.send('422 Unprocessable Entity');
        }
        else {
          console.log('query SUCCESS!\n')
          response.send(rows);
        }
    });
}

function getLibraryBook(request, response) {
    var bookID = request.params.bookID;
    var query = 'SELECT * FROM LibraryBook \
    WHERE bookID="' + bookID +'"';

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');

            response.status(422);
            response.send('422 Unprocessable Entity');
        }
        else {
          console.log('query SUCCESS!\n')
          response.send(rows);
        }
    });
}

function deleteLibraryBook(request, response) {
    var bookID = request.params.bookID;
    var query = 'DELETE FROM LibraryBook \
    WHERE bookID="' + bookID +'"';

    connection.query(query, function(error, rows, fields){
        if(!!error) {
            console.log('Error in the query\n');

            response.status(422);
            response.send('422 Unprocessable Entity');
        }
        else {
          console.log('query SUCCESS!\n')
          response.send(rows);
        }
    });
}

function getLibraryBookCount(reqest, response) {
  var query = 'Select Count(bookID) as Count from LibraryBook;'

  connection.query(query, function (error, rows, fields) {
    if (!!error) {
      console.log('Error in the query\n');
      response.status(422);
      response.send('422 Unprocessable Entity');
    }
    else {
      console.log('query SUCCESS!\n')
      response.send(rows);
    }
  });
}