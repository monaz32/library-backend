//include
var express = require('express');
var bodyParser = require('body-parser');
var app = express();

app.use(bodyParser.json())

//init routes
require('./routes/book')(app); 
require('./routes/employee')(app);
require('./routes/event')(app);
require('./routes/member')(app);

//start server
app.listen(8080, function () {
  console.log('Running on port 8080...')
});