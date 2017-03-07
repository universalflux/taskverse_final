taskverse.service('UserService', function($http, $location){
  let service = {};
  let currentUser = {};

  service.add = function(incoming, callback){
    $http.post('/create', incoming)
    .then(function(gotEm) {
      console.log(gotEm.data.readOut);
      currentUser = gotEm.data;
      callback(currentUser);
      return currentUser;
    });
  }

  service.loginUser = function(incoming, callback){
    $http.post('/login', incoming)
    .then(function(obtained){
      currentUser = obtained.data;
      console.log(currentUser.tasks);
      callback(currentUser);
      return currentUser;
    });
  };

  service.getUser = function(callback){
    callback(currentUser);
    return currentUser;
  }


  return service;
});

taskverse.controller('UsersController', function(UserService, TaskService, $location){
  let vm = this;
  vm.hideLogin = false;
  vm.hideCreate = true;
  vm.hideAll = false;

  vm.getUser = function(){
    UserService.getUser(function(gotcha){
      vm.currentUser = gotcha;
      TaskService.postUser(gotcha);
      });
  };

  vm.getUser();

  vm.loginDivSwitch = function(misc){
    console.log(misc.status);
    if (misc.status == "create") {
      vm.hideLogin = true;
      vm.hideCreate = false;
    } else {
      vm.hideLogin = false;
      vm.hideCreate = true;
    }
  };

  vm.add = function(newUser){

    UserService.add(newUser, function(nUser){
      vm.currentUser = nUser;
      vm.potUser = {};
      if(nUser.username){
      vm.hideAll = true;
      $location.path('/home');
      vm.currentUser.readOut = {};
      vm.getUser();
      }
    })
  }

  vm.login = function(posUser){

  UserService.loginUser(posUser, function(lUser){
      vm.currentUser = lUser;
      vm.newUser = {};
      if(lUser.username){
        vm.hideAll = true;
        $location.path('/home');
        vm.currentUser.readOut = {};
        vm.getuser();
      }
    });
}

// if(TaskService.currentUser) {
//   TaskService.grabUser((taskUser) => {
//     vm.getUser();
//     vm.currentUser = taskUser;
//   });
// }

});
