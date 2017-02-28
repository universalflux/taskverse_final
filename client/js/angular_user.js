taskverse.service('UserService', function($http, $location){
  let service = {};
  let currentUser = {};

  service.add = function(incoming, callback){
    $http.post('/create', incoming)
    .then(function(gotEm) {
      console.log(gotEm.data.username);
      currentUser = gotEm.data;
      callback(currentUser);
      return currentUser;
    });
  }

  service.loginUser = function(incoming, callback){
    $http.post('/login', incoming)
    .then(function(gotEm){
      currentUser = gotEm.data;
      callback(currentUser);
      return currentUser;
    });
  };

  service.getUser = function(callback){
    callback(currentUser);
  }

  return service;
});

taskverse.controller('UsersController', function(UserService, $location){
  let vm = this;
  vm.hideLogin = true;
  vm.hideCreate = false;
  vm.hideAll = true;

  vm.getUser = function(){
    UserService.getUser(function(gotcha){
      vm.currentUser = gotcha;
    });
  };

  vm.getUser();

  vm.add = function(newUser){

    UserService.add(newUser, function(nUser){
      vm.currentUser = nUser;
      vm.getUser();
      $location.path('/home');
    });
  }

  vm.login = function(posUser){
    UserService.loginUser(posUser, function(lUser){
    vm.currentUser = lUser;
    vm.getUser();
    $location.path('/home');
    })
  }

});
