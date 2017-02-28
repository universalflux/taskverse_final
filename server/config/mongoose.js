let mongoose = require('mongoose');
let fs = require('fs');

mongoose.connect('mongodb://localhost/taskverse_final');

var models_path=__dirname + '/../models';

fs.readdirSync(models_path).forEach(function(file){
  if(file.indexOf('.js') > 0){
    require(models_path + '/' + file);
  }
});
