let users = require('./../controllers/Users.js');
let tasks = require('./../controllers/Tasks.js');

module.exports = function(app){
  app.post('/create', function(req, res){
    users.create(req, res);
  });
  app.post('/login', function(req, res){
    users.login(req, res);
  });

  app.post('/task_create', function(req, res) {
    tasks.create(req, res);
  });
  app.delete('/task/:id', function(req, res) {
    tasks.destroy(req, res);
  })
}
