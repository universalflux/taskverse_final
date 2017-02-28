let express = require('express');
let app = express();
let path = require('path');
let bodyParser = require('body-parser')
let mongoose = require('mongoose');
let morgan = require('morgan');
let port = 5656 || process.env.PORT;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname + '/client')));

require('./server/config/mongoose.js');
require('./server/config/routes.js')(app);

app.listen(port, () => {
  console.log('Welcome to TaskVerse, you are on port#' + port);
});
