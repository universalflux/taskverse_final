taskverse.service('TaskService', function($http){
let service = {};
let task = {};
let currentUser = {};

service.addTask = function(outBound, callback){
  $http.post('/task_create', outBound)
  .then(function(gotEm){
    task = gotEm.data;
    callback(task);
    return task;
  });
}

service.removeTask = function(remUser,  callback) {
  $http.delete('task/' + {getIt: remUser._id})
  .then(function(updatedUser){
    currentUser = updatedUser.data;
    callback(currentUser);
    return currentUser;
  })
};

service.postUser = function(incoming){
  currentUser = incoming;
  return currentUser;
}

service.grabUser = function(callback){
  callback(currentUser);
  return currentUser;
};

return service;
});

taskverse.controller('TasksController', function(TaskService, UserService, $location, $route){
let vm = this;

vm.getCurrentUser = function(){
  if(!vm.currentUser) {
  TaskService.grabUser(function(glorious){
    vm.currentUser = glorious;
  })
  };
}

vm.getCurrentUser();

vm.addTask = function(incoming){
  incoming._user = vm.currentUser._id;
  console.log(incoming);
  TaskService.addTask(incoming, function(response){
    vm.currentUser = response;
    console.log(vm.currentUser);
    vm.insertTask = {};
  });

  };

vm.removeTask = function(info){
  console.log(info);
  TaskService.removeTask(info, function(alteredUser){
    vm.currentUser = alteredUser;
    console.log(alteredUser);
  });
};

});
