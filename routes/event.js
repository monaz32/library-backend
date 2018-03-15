//routes
module.exports = function(app) {  
    app.route('/event')
        .get(getAPI)
        .post(postAPI)
        .put(putAPI);
}

//API functions
function getAPI(request, response) {

}

function postAPI(request, response) {

}

function putAPI(request, response) {
	
}