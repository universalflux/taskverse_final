let mongoose = require('mongoose');
let User = mongoose.model('User');

module.exports = (function(req, res){
  return {
    create: function(req, res) {
      User.findOne({username: req.body.username}, function(err, success) {
        if(success){
          console.log("User is already in the system.  Pick a new username.");
        } else {
          User.create(req.body, function(err, success){
            if(!success){
              console.log("We have a serious problem");
            } else {
              console.log(success.username + ' has been created successfully.');
              res.json(success);
            }
          });
        }
      });

    },
    login: function(req, res) {
      User.findOne({username: req.body.username}, function(err, found){
        if(!found){
          console.log('Houston we have a problem.' + err);
        } else {
          if(found.password == req.body.password){
          console.log('Success! We found ' + found.username);
          res.json(found);
        } else {
          console.log('Username or Password is incorrect.');
        }
        }
      });
    }
  }
})();
