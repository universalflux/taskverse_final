let users = require('./../controllers/Users.js');

module.exports = function(app){
  app.post('/create', function(req, res){
    users.create(req, res);
  });
  app.post('/login', function(req, res){
    users.login(req, res);
  })
}
