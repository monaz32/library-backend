//routes
module.exports = function(app) {  
    app.route('/member')
        .get(getAPI)
        .post(postAPI)
        .put(putAPI);
}

var connection = require('../server').connection;

//API functions
function getAPI(request, response) {

}

function postAPI(request, response) {

}

function putAPI(request, response) {
	
}