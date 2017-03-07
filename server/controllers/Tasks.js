let mongoose = require('mongoose');
let User = mongoose.model('User');
let Task = mongoose.model('Task');

module.exports = (function(req, res){
  return {
    create: function(req, res){
      console.log(req.body.item  + ' : ' +  req.body._user + " on the server");

      Task.create(req.body, function(err, response){
        if(!response) {
          console.log("We had a problem creating the task.");
        } else {
          console.log('Task was successfully created and has been sent to the view. Now inserting into db.');
          User.findOne({_id: req.body._user})
          .populate('tasks')
          .exec(function(err, found) {
            if (!found) {
              console.log('We have a problem, user not in the system.');
            } else {
              console.log('User found! Now inserting task into user array.');
              response._user = found._id;
              found.tasks.push(response);
              response.save(function(err) {
                found.save(function(err){
                if (err) {
                  console.log('Something went wrong with the array insertion.');
                } else {
                  console.log('Task successfully inserted into array.');
                  res.json(found);
                }
                })
              })
            }
        })
      }
      });
    },
    destroy: function(req, res){
      Task.findOne(req.params.getIt, function(err, taskFound) {
        if(!taskFound) {
          console.log('Could not locate task in the destroy function');
        }  else {
          User.findOne({_id: taskFound._user})
          .populate('tasks')
          .exec(function(err, userFound){
            if(!userFound) {
              console.log('There was an error finding the task.');
            } else {
              console.log('Task has been found successfully!' + taskFound._id);
              userFound.tasks.remove({_id: taskFound._id});
              taskFound.remove(taskFound._id);
              taskFound.save(function(err) {
                userFound.save (function(err, success){
                if(!success) {
                  console.log('Could not remove task');
                } else {
                  console.log('Finally gone! Yay' + success);
                  res.json(success);
                }
              })
              })

            }
          })
          }
        })
      }
  }
})();
