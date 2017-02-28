taskverse.config(function($routeProvider){
  $routeProvider
  .when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'UsersController'
  });
});
