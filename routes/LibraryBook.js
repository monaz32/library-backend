//routes
module.exports = function(app) {  
    app.route('/librarybook')
        .post(addLibraryBook)
        .put(updateLibraryBook);

    app.route('/librarybook/filter')
        .post(getLibraryBooks);

    app.route('/librarybook/:bookID')
        .get(getLibraryBook)
        .delete(deleteLibraryBook);

    app.route('/librarybook/count')
        .get(getLibraryBookCount);
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
    var bookID = request.body.bookid;
    var isbn = request.body.isbn;
    var branchNum = request.body.branchNum;
    var status = request.body.status;
    var query = 'INSERT INTO LibraryBook (bookID, isbn, branchNum, status) \
    Values ("' +bookID +'", "' +isbn +'", "' +branchNum +'", "' +status +'")';

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
    var isbn = request.body.isbn;
    var branchNum = request.body.branchNum;
    var status = request.body.status;

    var query = 'UPDATE LibraryBook \
    Set isbn="' +isbn +'", branchNum="' +branchNum +'",\
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