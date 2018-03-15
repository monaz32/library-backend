//routes
module.exports = function(app) {  
    app.route('/book')
        .get(getBooks)
        .post(addBook)
        .put(updateBook);

    app.route('/book/:id')
        .get(getBook);
}

//API functions
function getBooks(request, response) {
    response.send('Books');
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