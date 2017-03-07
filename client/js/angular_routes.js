taskverse.config(function($routeProvider, $httpProvider){
  $routeProvider
  .when('/home', {
    templateUrl: 'partials/home.html',
    controller: 'UsersController'
  });

  $httpProvider
  .useApplyAsync(true);
});
